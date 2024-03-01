import { PrismaClient } from "@prisma/client";
import { Request, Response, response } from "express";
import md5 from "md5";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();


const createadmin = async (request: Request, response: Response) => {
  try {

    const namaAdmin = request.body.namaAdmin;
    const email = request.body.email;
    const password = (request.body.password);

    const newData = await prisma.admin.create({
      data: {
        namaAdmin: namaAdmin,
        email: email,
        password: password,
        },
    });

    return response.status(200).json({
      status: true,
      message: `Admin has been created!!`,
      data: newData,
    });

  } catch (error) {
    return response.status(500).json({
      status: false,
      message: "error",
    });
  }
};

const readadmin = async (request: Request, response: Response) => {
  try {
    const page = Number(request.query.page) || 1;
    const qty = Number(request.query.qty) || 10;
    const keyword = request.query.keyword?.toString() || "";
    const dataAdmin = await prisma.admin.findMany({
        /**pagination */
        take: qty,
        skip: (page - 1) * qty,
        /**searching */
        where: {
            OR: [
                { namaAdmin: { contains: keyword } },
                { email: { contains: keyword } }
            ]
        }
    })
    return response.status(200).json({
        status: true,
        message: `Admin has been loaded`,
        data: dataAdmin
    })
} catch (error) {
    return response.status(500).json({
        status: false,
        message: error
    })
}
}

const updateadmin = async (request: Request, response: Response) => {
  try {

    const ID = request.params.ID;

    const namaAdmin = request.body.namaAdmin;
    const email = request.body.email;
    const password = md5(request.body.password);

    const findadmin = await prisma.admin.findFirst({
      where: { adminID: Number(ID) },
    });

    if (!findadmin) {

        return response.status(400).json({
        status: false,
        message: `Data Admin not found...`,
      });
    }

    const dataadmin = await prisma.admin.update({
      where: { adminID: Number(ID) },
      data: {
        namaAdmin: namaAdmin || findadmin.namaAdmin,
        email: email || findadmin.email,
        password: password || findadmin.password,
        },
    });

    return response.status(200).json({
      status: true,
      message: `Admin has been updated!!`,
      data: dataadmin,
    });

  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

const deleteadmin = async (request: Request, response: Response) => {
  try {

    const ID = request.params.ID;

    const findadmin = await prisma.admin.findFirst({
      where: { adminID: Number(ID) },
    });
    if (!findadmin) {

        return response.status(400).json({
        status: false,
        message: `Data event not found...`,
      });
    }

    const dataadmin = await prisma.admin.delete({
      where: { adminID: Number(ID) },
    });
    return response.status(200).json({
      status: true,
      message: `Data admin has been deleted`,
    });

  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

    const login = async (request: Request, response: Response) => {
    try {
    const email = request.body.email;
    const password = md5(request.body.password);
    const admin = await prisma.admin.findFirst({
      where: { email: email, password: password },
    });

    if (admin) {
      const payload = admin;
      const secretkey = `akunsewamobil`;
      const token = sign(payload, secretkey);
      return response.status(200).json({
        status: true,
        Message: "Login Masuk",
        token: token,
      });

    } else {
      return response.status(200).json({
        status: false,
        Message: "Salah",
      });
    }
        
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: error,
    });
  }
};

export { createadmin, readadmin, updateadmin, deleteadmin, login };
