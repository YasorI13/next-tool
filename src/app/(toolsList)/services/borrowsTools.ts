"use server";

import prisma from "@/lib/db";
import { getServerSession } from 'next-auth/next'
import { options } from "@/app/api/auth/[...nextauth]/options"

import https from 'https';
import { http } from "@/services/http-service";

type setToolsToGroupProp = {
  id: number;
}
export async function setBorrowToReady({ id }: setToolsToGroupProp) {
  try {

    const session = await getServerSession(options);
    if (!session) {
      return ({ status: 401, message: "กรุณาเข้าสู่ระบบ", });
    }

    const borrowForm = await prisma.borrowForm.findUnique({
      where: {
        id: Number(id),
        FormStatusId: 2
      }
    })
    if (!borrowForm) return ({ status: 404, message: "ไม่พบข้อมูล", });

    const result = await prisma.$transaction(async (tx) => {
      const updateForm = await tx.borrowForm.update({
        where: {
          id: Number(id),
        },
        data: {
          FormStatusId: 1,
        },
      })

      const updateItems = await tx.borrowItem.updateMany({
        where: {
          borrowFormId: Number(id),
        },
        data: {
          status: "prepar",
        },
      })

      // คุณสามารถเช็คจำนวน row ที่อัปเดตได้ด้วย
      if (!updateForm || updateItems.count === 0) {
        throw new Error("Update failed")
      }

      return {
        status: 200,
        message: "แก้ไขข้อมูลสำเร็จ",
      }

    })

    if (!result) return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });

    return ({ status: 200, message: "แก้ไขข้อมูลสำเร็จ", });


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.log(error);
    return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });
  }
}



export async function setBorrowToSend({ id }: setToolsToGroupProp) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return ({ status: 401, message: "กรุณาเข้าสู่ระบบ", });
    }

    const borrowForm = await prisma.borrowForm.findUnique({
      where: {
        id: Number(id),
        FormStatusId: 1
      }
    })
    if (!borrowForm) return ({ status: 404, message: "ไม่พบข้อมูล", });

    const result = await prisma.$transaction(async (tx) => {
      const updateForm = await tx.borrowForm.update({
        where: {
          id: Number(id),
        },
        data: {
          FormStatusId: 2,
          sendDate: new Date(),
        },
      })

      const updateItems = await tx.borrowItem.updateMany({
        where: {
          borrowFormId: Number(id),
        },
        data: {
          status: "sending",
        },
      })

      // คุณสามารถเช็คจำนวน row ที่อัปเดตได้ด้วย
      if (!updateForm || updateItems.count === 0) {
        throw new Error("Update failed")
      }



      return {
        status: 200,
        message: "แก้ไขข้อมูลสำเร็จ",
      }

    })

    if (!result) return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });

    const borrowItems = await prisma.borrowItem.findMany({
      where: {
        borrowFormId: Number(id),
      },
      include: {
        tool: true
      }
    })

    // จัดกลุ่มข้อมูลตาม personNo โดยไม่ซ้ำ
    const personMap = new Map<string, typeof borrowItems>();

    for (const item of borrowItems) {
      const personNo = item.tool.personNo;
      if (!personMap.has(String(personNo))) {
        personMap.set(String(personNo), []);
      }
      personMap.get(String(personNo))!.push(item);
    }

    // แปลงเป็น array เพื่อจัดลำดับ
    const grouped = Array.from(personMap.entries());

    // ส่งอีเมลเรียงลำดับตามที่ต้องการ
    for (let i = 0; i < grouped.length; i++) {
      const [personNo, items] = grouped[i];
      const sendItems = items.slice(0, i + 1);

      // สร้างข้อความอีเมล (ตัวอย่าง)
      const emailBody = sendItems.map((item, index) =>
        `${index + 1}. ${item.tool.assetDescription} (${item.tool.asset})`
      ).join('\n');


      try {
        const subject = `แจ้งรายการยืมครุภัณฑ์`;

        const body = `
          <div style="font-family: Arial, sans-serif; font-size: 16px;">
        <p style="font-size: 18px; font-weight: bold;">เรียน Admin,</p>
        <p>มีเอกสารยืมครุภัณฑ์ รอการอนุมัติ:</p>
        <p style="font-size: 16px; font-weight: bold;">เลขที่เอกสาร: ${id}</p>
        ${emailBody}
            
        <p>กรุณาคลิกลิงก์ด้านล่างเพื่อดำเนินการอนุมัติ:</p>
        <a href="${process.env.NEXTAUTH_URL}/BorrowDetail/${id}" 
            style="font-size: 16px; color: blue; text-decoration: underline;">ดำเนินการ อนุมัติ</a>
        </div>
        `;


        const receivers = [personNo + '@egat.co.th'];

        const payload = {
          receivers,
          subject,
          body,
        };

        const httpsAgent = new https.Agent({
          rejectUnauthorized: false, // ข้ามการตรวจสอบใบรับรอง SSL (ใช้ในกรณีฉุกเฉิน)
        });
        const response = await http.post(
          `${process.env.NEXT_PUBLIC_SEND_MAIL_URL}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
            httpsAgent,
          }
        );

        console.log("Email sent successfully:", response.data);
      } catch (error) {
        console.error("Error sending email:", error);
      }

    }

    return ({ status: 200, message: "แก้ไขข้อมูลสำเร็จ", });


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.log(error);
    return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });
  }
}


type BorrowItem = {
  id: number;
}

export async function setBorrowItemToAccept({ id }: BorrowItem) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return ({ status: 401, message: "กรุณาเข้าสู่ระบบ", });
    }

    const update = await prisma.borrowItem.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "approve",
        approveDate: new Date(),
        approveBy: session.user.email, //session.user.email
      },
      include: {
        borrowForm: true
      }
    });

    if (!update) return ({ status: 404, message: "ไม่พบข้อมูล", });

    const checkBorrowSending = await prisma.borrowItem.findMany({
      where: {
        borrowFormId: update.borrowFormId,
        status: "sending"
      }
    })

    const checkBorrowApprove = await prisma.borrowItem.findMany({
      where: {
        borrowFormId: update.borrowFormId,
        status: "approve"
      },
      include: {
        tool: true
      }
    })

    if (checkBorrowSending.length === 0 && checkBorrowApprove.length >= 1) {
      const updateForm = await prisma.borrowForm.update({
        where: {
          id: update.borrowFormId
        },
        data: {
          FormStatusId: 5,
          approveDate: new Date()
        },
        include: {
          person: true
        }
      })
      if (!updateForm) return ({ status: 404, message: "ไม่พบข้อมูล", });

      checkBorrowApprove.forEach(async (item) => {
        await prisma.toolsData.update({
          where: {
            asset: item.tool.asset
          },
          data: {
            toolsStatus: "Borrow"
          }
        })
      })

      const emailBody = checkBorrowApprove.map((item, index) =>
        `<p style="font-size: 16px; ">${index + 1}. ${item.tool.assetDescription} (${item.tool.asset})</p>`).join('\n');


      try {
        const subject = `แจ้งการอนุมัติ รายการยืมครุภัณฑ์`;

        const body = `
          <div style="font-family: Arial, sans-serif; font-size: 16px;">
          <p style="font-size: 18px; font-weight: bold;">
          แจ้งการอนุมัติ รายการยืมครุภัณฑ์</p>
        <p style="font-size: 18px; font-weight: bold;">เรียน  ${updateForm.person.person_thai_thai_firstname} ${updateForm.person.person_thai_thai_lastname},</p>

        <p style="font-size: 16px; font-weight: bold;">เลขที่เอกสาร: ${updateForm.id}</p>
        ${emailBody}
            
        <a href="${process.env.NEXTAUTH_URL}/BorrowDetail/${updateForm.id}" 
            style="font-size: 16px; color: blue; text-decoration: underline;">ตรวจสอบเอกสาร</a>
        </div>
        `;


        const receivers = [updateForm.id_no + '@egat.co.th'];

        const payload = {
          receivers,
          subject,
          body,
        };

        const httpsAgent = new https.Agent({
          rejectUnauthorized: false, // ข้ามการตรวจสอบใบรับรอง SSL (ใช้ในกรณีฉุกเฉิน)
        });
        const response = await http.post(
          `${process.env.NEXT_PUBLIC_SEND_MAIL_URL}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
            httpsAgent,
          }
        );

        console.log("Email sent successfully:", response.data);
      } catch (error) {
        console.error("Error sending email:", error);
      }














      return ({ status: 200, message: "แก้ไขข้อมูลสำเร็จ", });
    } else {
      return ({ status: 200, message: "แก้ไขข้อมูลสำเร็จ", });
    }



    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.log(error);
    return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });
  }
}


export async function setBorrowItemTosending({ id }: BorrowItem) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return ({ status: 401, message: "กรุณาเข้าสู่ระบบ", });
    }

    const update = await prisma.borrowItem.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "sending",
        approveDate: null,
        approveBy: null
      },
      include: {
        borrowForm: true
      }
    });

    if (!update) return ({ status: 404, message: "ไม่พบข้อมูล", });

    const checkBorrowSending = await prisma.borrowItem.findMany({
      where: {
        borrowFormId: update.borrowFormId,
        status: "sending"
      }
    })

    if (checkBorrowSending.length >= 1) {
      const updateForm = await prisma.borrowForm.update({
        where: {
          id: update.borrowFormId
        },
        data: {
          FormStatusId: 2,
          approveDate: null
        }
      })
      if (!updateForm) return ({ status: 404, message: "ไม่พบข้อมูล", });
      return ({ status: 200, message: "แก้ไขข้อมูลสำเร็จ", });
    } else {
      return ({ status: 200, message: "แก้ไขข้อมูลสำเร็จ", });
    }



    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.log(error);
    return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });
  }
}












export async function setBorrowToReturn({ id }: setToolsToGroupProp) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return ({ status: 401, message: "กรุณาเข้าสู่ระบบ", });
    }

    const borrowForm = await prisma.borrowForm.findUnique({
      where: {
        id: Number(id),
        FormStatusId: 5
      }
    })
    if (!borrowForm) return ({ status: 404, message: "ไม่พบข้อมูล", });

    const result = await prisma.$transaction(async (tx) => {
      const updateForm = await tx.borrowForm.update({
        where: {
          id: Number(id),
        },
        data: {
          FormStatusId: 6,   /// 6 ส่งเอกสารคืนเครื่องมือ
          sendreturnDate: new Date(),
        },
      })

      const updateItems = await tx.borrowItem.updateMany({
        where: {
          borrowFormId: Number(id),
        },
        data: {
          status: "sendreturn",
        },
      })

      // คุณสามารถเช็คจำนวน row ที่อัปเดตได้ด้วย
      if (!updateForm || updateItems.count === 0) {
        throw new Error("Update failed")
      }



      return {
        status: 200,
        message: "แก้ไขข้อมูลสำเร็จ",
      }

    })

    if (!result) return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });

    const borrowItems = await prisma.borrowItem.findMany({
      where: {
        borrowFormId: Number(id),
      },
      include: {
        tool: true
      }
    })

    // จัดกลุ่มข้อมูลตาม personNo โดยไม่ซ้ำ
    const personMap = new Map<string, typeof borrowItems>();

    for (const item of borrowItems) {
      const personNo = item.tool.personNo;
      if (!personMap.has(String(personNo))) {
        personMap.set(String(personNo), []);
      }
      personMap.get(String(personNo))!.push(item);
    }

    // แปลงเป็น array เพื่อจัดลำดับ
    const grouped = Array.from(personMap.entries());

    // ส่งอีเมลเรียงลำดับตามที่ต้องการ
    for (let i = 0; i < grouped.length; i++) {
      const [personNo, items] = grouped[i];
      const sendItems = items.slice(0, i + 1);

      // สร้างข้อความอีเมล (ตัวอย่าง)
      const emailBody = sendItems.map((item, index) =>
        `${index + 1}. ${item.tool.assetDescription} (${item.tool.asset})`
      ).join('\n');


      try {
        const subject = `แจ้งรายการคืนครุภัณฑ์`;

        const body = `
          <div style="font-family: Arial, sans-serif; font-size: 16px;">
        <p style="font-size: 18px; font-weight: bold;">เรียน Admin,</p>
        <p>มีเอกสารคืนครุภัณฑ์ รอการอนุมัติ:</p>
        <p style="font-size: 16px; font-weight: bold;">เลขที่เอกสาร: ${id}</p>
        ${emailBody}
            
        <p>กรุณาคลิกลิงก์ด้านล่างเพื่อดำเนินการอนุมัติ:</p>
        <a href="${process.env.NEXTAUTH_URL}/BorrowDetail/${id}" 
            style="font-size: 16px; color: blue; text-decoration: underline;">ดำเนินการ อนุมัติ</a>
        </div>
        `;


        const receivers = [personNo + '@egat.co.th'];

        const payload = {
          receivers,
          subject,
          body,
        };

        const httpsAgent = new https.Agent({
          rejectUnauthorized: false, // ข้ามการตรวจสอบใบรับรอง SSL (ใช้ในกรณีฉุกเฉิน)
        });
        const response = await http.post(
          `${process.env.NEXT_PUBLIC_SEND_MAIL_URL}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
            httpsAgent,
          }
        );

        console.log("Email sent successfully:", response.data);
      } catch (error) {
        console.error("Error sending email:", error);
      }

    }

    return ({ status: 200, message: "แก้ไขข้อมูลสำเร็จ", });


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.log(error);
    return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });
  }
}

























export async function setBorrowToReturnToAccept({ id }: BorrowItem) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return ({ status: 401, message: "กรุณาเข้าสู่ระบบ", });
    }

    const result = await prisma.$transaction(async (tx) => {
      const updateForm = await tx.borrowForm.update({
        where: {
          id: Number(id),
        },
        data: {
          FormStatusId: 5,
        },
      });

      const updateItems = await tx.borrowItem.updateMany({
        where: {
          borrowFormId: updateForm.id,
        },
        data: {
          status: "approve",
          returnDate: null,
          returnBy: null
        }
      });

      // คุณสามารถเช็คจำนวน row ที่อัปเดตได้ด้วย
      if (!updateForm || updateItems.count === 0) {
        throw new Error("Update failed")
      }
      return {
        status: 200,
        message: "แก้ไขข้อมูลสำเร็จ",
      }

    });

    if (!result) return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });

    return ({ status: 200, message: "แก้ไขข้อมูลสำเร็จ", });



    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.log(error);
    return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });
  }
}














export async function setBorrowItemToReturn({ id }: BorrowItem) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return ({ status: 401, message: "กรุณาเข้าสู่ระบบ", });
    }

    const update = await prisma.borrowItem.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "return",
        returnDate: new Date(),
        returnBy: session.user.email, //session.user.email
      },
      include: {
        borrowForm: true
      }
    });

    if (!update) return ({ status: 404, message: "ไม่พบข้อมูล", });

    const checkBorrowSending = await prisma.borrowItem.findMany({
      where: {
        borrowFormId: update.borrowFormId,
        status: "sendreturn"
      }
    })

    const checkBorrowApprove = await prisma.borrowItem.findMany({
      where: {
        borrowFormId: update.borrowFormId,
        status: "return"
      },
      include: {
        tool: true
      }
    })

    if (checkBorrowSending.length === 0 && checkBorrowApprove.length >= 1) {
      const updateForm = await prisma.borrowForm.update({
        where: {
          id: update.borrowFormId
        },
        data: {
          FormStatusId: 7,
          returnDate: new Date()
        },
        include: {
          person: true
        }
      })
      if (!updateForm) return ({ status: 404, message: "ไม่พบข้อมูล", });

      checkBorrowApprove.forEach(async (item) => {
        await prisma.toolsData.update({
          where: {
            asset: item.tool.asset
          },
          data: {
            toolsStatus: "Active"
          }
        })
      })

      const emailBody = checkBorrowApprove.map((item, index) =>
        `<p style="font-size: 16px; ">${index + 1}. ${item.tool.assetDescription} (${item.tool.asset})</p>`).join('\n');


      try {
        const subject = `แจ้งการอนุมัติ รายการคืนครุภัณฑ์`;

        const body = `
          <div style="font-family: Arial, sans-serif; font-size: 16px;">
          <p style="font-size: 18px; font-weight: bold;">
          แจ้งการอนุมัติ รายการคืนครุภัณฑ์</p>
        <p style="font-size: 18px; font-weight: bold;">เรียน  ${updateForm.person.person_thai_thai_firstname} ${updateForm.person.person_thai_thai_lastname},</p>

        <p style="font-size: 16px; font-weight: bold;">เลขที่เอกสาร: ${updateForm.id}</p>
        ${emailBody}
            
        <a href="${process.env.NEXTAUTH_URL}/BorrowDetail/${updateForm.id}" 
            style="font-size: 16px; color: blue; text-decoration: underline;">ตรวจสอบเอกสาร</a>
        </div>
        `;


        const receivers = [updateForm.id_no + '@egat.co.th'];

        const payload = {
          receivers,
          subject,
          body,
        };

        const httpsAgent = new https.Agent({
          rejectUnauthorized: false, // ข้ามการตรวจสอบใบรับรอง SSL (ใช้ในกรณีฉุกเฉิน)
        });
        const response = await http.post(
          `${process.env.NEXT_PUBLIC_SEND_MAIL_URL}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
            httpsAgent,
          }
        );

        console.log("Email sent successfully:", response.data);
      } catch (error) {
        console.error("Error sending email:", error);
      }














      return ({ status: 200, message: "แก้ไขข้อมูลสำเร็จ", });
    } else {
      return ({ status: 200, message: "แก้ไขข้อมูลสำเร็จ", });
    }



    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.log(error);
    return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });
  }
}