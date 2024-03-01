import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const createcar = async (request: Request, response: Response) => {
  try {
   
        const carType = request.body.carType;
        const Nopol = request.body.nopol;
        const Price = Number(request.body.Price);

    const newData = await prisma.car.create({
      data: {
         carType : carType,
         Nopol : Nopol,
         Price : Price
        }
    });

    return response.status(200).json({
      status: true,
      message: `Car has been created`,
      data: newData,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const readcar = async (request: Request, response: Response) => {
    try {
        const page = Number(request.query.page) || 1;
        const qty = Number(request.query.qty) || 5;
        const keyword = request.query.keyword?.toString() || "";
        const dataCar = await prisma.car.findMany({
            /**pagination */
            take: qty,
            skip: (page - 1) * qty,
            /**searching */
            where: {
                OR: [
                    { Nopol: { contains: keyword } },
                    { carType: { contains: keyword } }
                ]
            },
        })
        return response.status(200).json({
            status: true,
            messgae: `car has been loaded`,
            data: dataCar
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const updatecar = async (request: Request, response: Response) => {
  try {
    const carID = request.body.carID
    const carType = request.body.carType;
    const Nopol = request.body.nopol;
    const Price = Number(request.body.Price);

    const findcar = await prisma.car.findFirst({
      where: { carID: Number(carID) },
    });

    if (!findcar) {
      return response.status(400).json({
        status: false,
        message: `Data event not found...`,
      });
    }

 const datacar = await prisma.car.update({
      where: { carID: Number(carID) },
      data: {
        carID: carID || findcar.carID,
        carType: carType || findcar.carType,
        Nopol: Nopol || findcar.Nopol,
        Price:Price || findcar.Price
      },
    });

    return response.status(200).json({
      status: true,
      message: `Event has been updated`,
      data: datacar,
    });

  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const deletecar = async (request: Request, response: Response) => {
  try {
    const carID = request.params.carID

    const findcar = await prisma.car.findFirst({
      where: { carID: Number(carID)}
    })
    if (!findcar) {
      return response.status(400).json({
        status: false,
        message: `Data event not found...`,
      });
    }

 const dataSeats = await prisma.car.delete({
      where : {carID: Number(carID)}
    })
    return response.status(200)
    .json({
      status: true,
      message: `Data events has been deleted`
    })

  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

export {createcar, readcar, updatecar, deletecar}