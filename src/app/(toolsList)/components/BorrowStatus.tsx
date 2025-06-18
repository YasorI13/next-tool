import React, { useEffect } from 'react'
import { BorrowFormEx } from '../types/types'
import { Box, Button, Fieldset, Text, Timeline } from '@mantine/core'
import { IconGitBranch, IconGitCommit, IconGitPullRequest, IconMessageDots } from '@tabler/icons-react'
import { setBorrowToReady, setBorrowToReturn, setBorrowToReturnToAccept, setBorrowToSend } from '../services/borrowsTools'


type Props = {
    borrowFormData : BorrowFormEx | undefined
    handleDataUpdated : () => void
    close : () => void
    mutate : () => void
}
function BorrowStatus({borrowFormData ,handleDataUpdated ,close ,mutate}: Props) {
    const [active, setActive] = React.useState(1);
    useEffect(() => {
        if (borrowFormData) {

            if (borrowFormData.FormStatusId === 1) {
                setActive(0);
            } else if (borrowFormData.FormStatusId === 2) {
                setActive(1);
            } else if (borrowFormData.FormStatusId === 5) {
                setActive(2);
            
            } else if (borrowFormData.FormStatusId === 6) {
                setActive(3);
            
            } else if (borrowFormData.FormStatusId === 7) {
                setActive(4);
            }
        }
    }, [borrowFormData]);
  return (
    <>
      <Box  mx="auto">
        <Fieldset legend="สถานะใบยืมเครื่องมือ" radius="lg" variant="filled">
            <Timeline active={active} bulletSize={24} lineWidth={2}>
            <Timeline.Item bullet={<IconGitBranch size={12} />} title="สร้างเอกสารใบยืมเครื่องมือ">
                <Text c="dimmed" size="sm">ผู้สร้างเอกสาร <Text variant="link" component="span" inherit>{borrowFormData?.person.person_thai_thai_firstname + " " + borrowFormData?.person.person_thai_thai_lastname}</Text></Text>
                <Text size="xs" mt={4}>{borrowFormData ? new Date(borrowFormData.CreateDate).toLocaleString() : ""}</Text>
                {borrowFormData?.FormStatusId === 2 && (
                    <Button
                        mt={10} 
                        onClick={ async () => {
                          const res = await  setBorrowToReady({ id: borrowFormData.id });
                        //   console.log(res);
                          if (res.status === 200) {
                            handleDataUpdated();
                            mutate();
                            close();
                          }
                        }}
                    >
                        กลับสร้างเอกสาร
                    </Button>
                )}
            </Timeline.Item>

            <Timeline.Item bullet={<IconGitCommit size={12} />} title="ส่งเอกสาร ขออนุมัติ">
                <Text size="xs" mt={4}>{borrowFormData?.sendDate ? new Date(borrowFormData.sendDate).toLocaleString() : ""}</Text>
                {borrowFormData?.FormStatusId === 1 && (
                    <Button
                        mt={10} 
                        onClick={ async () => {
                          const res = await  setBorrowToSend({ id: borrowFormData.id });
                        //   console.log(res);
                          if (res.status === 200) {
                            handleDataUpdated();
                            mutate();
                            close();
                          }
                        }}
                    >
                        ส่งเอกสาร ขออนุมัติ 
                    </Button>
                )}

                
            </Timeline.Item>

            <Timeline.Item title="อนุมัติเอกสาร" bullet={<IconGitPullRequest size={12} />} >
                <Text size="xs" mt={4}>{borrowFormData?.approveDate ? new Date(borrowFormData.approveDate).toLocaleString() : ""}</Text>
                {borrowFormData?.FormStatusId === 6 && (
                    <Button 
                        mt={10}
                        onClick={ async () => {
                          const res = await  setBorrowToReturnToAccept({ id: borrowFormData.id });
                        //   console.log(res);
                          if (res.status === 200) {
                            handleDataUpdated();
                            mutate();
                            close();
                          }
                        }}
                    >
                        กลับ ตำแหน่ง อนุมัติเอกสาร
                    </Button>
                )}
            </Timeline.Item>

            <Timeline.Item title="ส่งเอกสาร การคืนเครื่องมือ" bullet={<IconMessageDots size={12} />}>
                <Text size="xs" mt={4}>{borrowFormData?.sendreturnDate ? new Date(borrowFormData.sendreturnDate).toLocaleString() : ""}</Text>
                {borrowFormData?.FormStatusId === 5 && (
                    <Button 
                        mt={10}
                        onClick={ async () => {
                          const res = await  setBorrowToReturn({ id: borrowFormData.id });
                        //   console.log(res);
                          if (res.status === 200) {
                            handleDataUpdated();
                            mutate();
                            close();
                          }
                        }}
                    >
                        ส่งเอกสาร ขออนุมัติ คืนเครื่องมือ
                    </Button>
                )}
            </Timeline.Item>
            
            <Timeline.Item title="อนุมัติการคืนเครื่องมือ ปิดงาน" bullet={<IconMessageDots size={12} />}>
                <Text size="xs" mt={4}>{borrowFormData?.returnDate ? new Date(borrowFormData.returnDate).toLocaleString() : ""}</Text>
            </Timeline.Item>
            </Timeline>
        </Fieldset>
      </Box>
    </>
  )
}

export default BorrowStatus