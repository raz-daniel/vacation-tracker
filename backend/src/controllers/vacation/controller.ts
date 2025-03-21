import { NextFunction, Request, Response } from "express";
import Vacation from "../../model/vacation";
import User from "../../model/user";
import { fn, col, Op, literal } from "sequelize";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";
import socket from "../../io/io";
import { parse } from 'json2csv';
import Follower from "../../model/follower";

// export async function getAllVacations(req: Request, res: Response, next: NextFunction) {
//     try {
//         console.log("getAllVacations called for userId:", req.userId); // Log the current user ID
//         const page = parseInt(req.query.page as string) || 1
//         const limit = parseInt(req.query.limit as string) || 10
//         const offset = (page - 1) * limit

//         const count = await Vacation.count();
//         console.log(`Total vacation count: ${count}`); // Log total vacation count

//         const vacations = await Vacation.findAll({
//             include: [{
//                 model: User,
//                 as: 'followers',
//                 attributes: [],
//                 through: { attributes: [] }
//             }],
//             attributes: {
//                 include: [
//                     // Use distinct count to get accurate follower count
//                     [fn('COUNT', fn('DISTINCT', col('followers.id'))), 'followerCount'],

//                     // Add a subquery to check if current user follows this vacation
//                     [literal(`(
//                     SELECT COUNT(*) > 0 
//                     FROM followers 
//                     WHERE 
//                         followers.vacation_id = Vacation.id AND 
//                         followers.user_id = '${req.userId}'
//                 )`), 'isFollowedByCurrentUser']
//                 ]
//             },
//             group: ['Vacation.id'],
//             order: [
//                 ['beginDate', 'ASC']
//             ],
//             limit: limit,
//             offset: offset

//         })

//         // Log each vacation's follower count and follow status
//         console.log("Vacations with follow data:", vacations.map(v => {
//             const plain = v.get({ plain: true });
//             return {
//                 id: plain.id,
//                 destination: plain.destination,
//                 followerCount: plain.followerCount,
//                 isFollowedByCurrentUser: plain.isFollowedByCurrentUser
//             };
//         }));
//         res.json({
//             vacations,
//             totalItems: count,
//             totalPages: Math.ceil(count / limit),
//             currentPage: page
//         });

//     } catch (error) {
//         console.error("Error in getAllVacations:", error); // Log error details
//         next(error);
//     }
// }

// Replace your current getAllVacations function with this
export async function getAllVacations(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;

        const count = await Vacation.count();

        // Get vacations without trying to count followers in the same query
        const vacations = await Vacation.findAll({
            order: [['beginDate', 'ASC']],
            limit: limit,
            offset: offset
        });

        // Get plain vacation objects
        const plainVacations = vacations.map(v => v.get({ plain: true }));
        
        // Get follower counts for each vacation in a separate query
        const followerCounts = await Follower.findAll({
            attributes: [
                'vacationId', 
                [fn('COUNT', col('vacation_id')), 'count']
            ],
            group: ['vacationId']
        });
        
        // Convert to a map for easy lookup
        const countsMap = new Map();
        followerCounts.forEach(fc => {
            countsMap.set(fc.get('vacationId'), fc.get('count'));
        });
        
        // Find which vacations the current user follows
        const followedVacations = await Follower.findAll({
            where: { userId: req.userId },
            attributes: ['vacationId']
        });
        
        // Get just the IDs the user follows
        const followedIds = followedVacations.map(f => f.get('vacationId'));
        
        // Combine everything into the result
        const result = plainVacations.map(vacation => ({
            ...vacation,
            followerCount: countsMap.get(vacation.id) || 0,
            isFollowedByCurrentUser: followedIds.includes(vacation.id)
        }));

        res.json({
            vacations: result,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });

    } catch (error) {
        console.error("Error in getAllVacations:", error);
        next(error);
    }
}

export async function createVacation(req: Request<{}, {}, {
    destination: string,
    description: string,
    beginDate: Date,
    endDate: Date,
    price: number
}>, res: Response, next: NextFunction) {

    const { imageUrl } = req

    try {
        const user = await User.findByPk(req.userId)
        if (user?.role !== 'admin')
            return next(new AppError(StatusCodes.FORBIDDEN, 'Only admins can create vacations'))

        const vacationData = {
            ...req.body,
            ...(imageUrl && { imageUrl })
        }

        const vacation = await Vacation.create(vacationData)
        socket.emit('newVacation', vacation)
        res.status(StatusCodes.CREATED).json(vacation);

    } catch (error) {
        next(error)
    }
}

export async function updateVacation(req: Request<{ id: string }, {}, {
    destination?: string;
    description?: string;
    beginDate?: Date;
    endDate?: Date;
    price?: number;
}>, res: Response, next: NextFunction) {

    const { imageUrl } = req
    const { id } = req.params

    try {

        const user = await User.findByPk(req.userId)
        if (user.role !== 'admin') {
            return next(new AppError(StatusCodes.FORBIDDEN, 'Only admins can update vacations'))
        }

        const vacation = await Vacation.findByPk(id)
        if (!vacation) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Vacation not found'));
        }

        const updatedData = {
            ...req.body,
            ...(req.imageUrl && { imageUrl })
        }

        await vacation.update(updatedData);
        socket.emit("updateVacation", vacation)
        res.json(vacation);

    } catch (error) {
        next(error)
    }

}


export async function deleteVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        const user = await User.findByPk(req.userId);
        if (user?.role !== 'admin') {
            return next(new AppError(StatusCodes.FORBIDDEN, 'Only admins can delete vacations'));
        }

        const vacation = await Vacation.findByPk(id);

        if (!vacation) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Vacation not found'));
        }

        await vacation.destroy();
        socket.emit('deleteVacation', id);
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
}

export async function getVacationsPerFollower(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const offset = (page - 1) * limit

        const count = await Follower.count({
            distinct: true,
            col: 'vacationId',
            where: {
                userId: req.userId
            }
        })

        const vacations = await Vacation.findAll({
            include: [{
                model: User,
                as: 'followers',
                attributes: [],
                through: {
                    attributes: [],
                    where: { userId: req.userId }
                },
                required: true
            }],
            attributes: {
                include: [
                    [fn('COUNT', col('id')), 'followerCount']
                ]
            },
            group: ['Vacation.id'],
            order: [
                ['beginDate', 'ASC']
            ],
            limit: limit,
            offset: offset
        })
        res.json({
            vacations,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        next(error)
    }
}

export async function getUpcomingVacations(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const offset = (page - 1) * limit

        const count = await Vacation.count({
            where: {
                beginDate: {
                    [Op.gt]: new Date()
                }
            }
        });

        const vacations = await Vacation.findAll({
            where: {
                beginDate: {
                    [Op.gt]: new Date()
                }
            },
            include: [{
                model: User,
                as: 'followers',
                attributes: [],
                through: { attributes: [] }
            }],
            attributes: {
                include: [
                    [fn('COUNT', col('id')), 'followerCount']
                ]
            },
            group: ['Vacation.id'],
            order: [
                ['beginDate', 'ASC']
            ],
            limit: limit,
            offset: offset

        })
        res.json({
            vacations,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        next(error)
    }
}

export async function getCurrentVacations(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const offset = (page - 1) * limit

        const count = await Vacation.count({
            where: {
                beginDate: {
                    [Op.lte]: new Date()
                },
                endDate: {
                    [Op.gt]: new Date()
                }
            }
        })

        const vacations = await Vacation.findAll({
            where: {
                beginDate: {
                    [Op.lte]: new Date()
                },
                endDate: {
                    [Op.gt]: new Date()
                }
            },
            include: [{
                model: User,
                as: 'followers',
                attributes: [],
                through: { attributes: [] }
            }],
            attributes: {
                include: [
                    [fn('COUNT', col('id')), 'followerCount']
                ]
            },
            group: ['Vacation.id'],
            order: [
                ['beginDate', 'ASC']
            ],
            limit: limit,
            offset: offset
        })

        res.json({
            vacations,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });

    } catch (error) {
        next(error)
    }
}

export async function exportVacationsToCSV(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.findByPk(req.userId);
        if (user?.role !== 'admin') {
            return next(new AppError(StatusCodes.FORBIDDEN, 'Only admins can export vacation data'));
        }

        const vacations = await Vacation.findAll({
            include: [{
                model: User,
                as: 'followers',
                attributes: [],
                through: { attributes: [] }
            }],
            attributes: {
                include: [
                    [fn('COUNT', col('followers.id')), 'followerCount']
                ]
            },
            group: ['Vacation.id'],
            order: [['beginDate', 'ASC']]
        });

        // Convert to plain objects
        const plainVacations = vacations.map(v => {
            const plain = v.get({ plain: true });
            // Format dates for CSV
            plain.beginDate = new Date(plain.beginDate).toLocaleDateString();
            plain.endDate = new Date(plain.endDate).toLocaleDateString();
            return plain;
        });

        // Define fields for CSV
        const fields = ['id', 'destination', 'description', 'beginDate', 'endDate', 'price', 'followerCount'];

        // Generate CSV
        const csv = parse(plainVacations, { fields });

        // Set headers for file download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="vacations.csv"');

        // Send CSV
        res.send(csv);
    } catch (error) {
        next(error);
    }
}