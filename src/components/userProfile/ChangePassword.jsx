import React from 'react'

import {Button, Input, Modal, Surface ,TextArea , TextField ,FieldError} from "@heroui/react";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changePassword } from '../../services/UserServices';
import { changePasswordSechema } from '../../lib/validationSchemas/changePasswordSechema';
import { FaSpinner } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function ChangePassword({ isOpen, onOpen, onOpenChange }) {
   const [isLoading, setIsLoading] = useState(false);
   
   let {
        register,
        handleSubmit,
        formState: { errors ,issubmiting}
      } = useForm({
        mode: "onChange",
        resolver: zodResolver(changePasswordSechema),
        defaultValues: {
          password: "",
          newPassword: "",
        },
      });

   async  function submit(data){
         try {
           setIsLoading(true);
           const response = await changePassword(data);
           toast.success(response.data.message);
         } catch (error) {
          console.log(error);
             toast.error('Failed to change password');  
         }finally{
             setIsLoading(false);
         }
        }

      return (
         <Modal isOpen={isOpen}  onOpenChange={onOpenChange}>
              <Modal.Backdrop>
                <Modal.Container placement="auto">
                  <Modal.Dialog className="sm:max-w-md">
                    <Modal.CloseTrigger />
                    <Modal.Header>
                      <Modal.Heading>Change Password</Modal.Heading>
                    </Modal.Header>
                    <Modal.Body className="p-6">
                      <Surface variant="default">
                        <form className="flex flex-col gap-4"  onSubmit={handleSubmit(submit)}> 
                        <div className="flex py-2 px-1 items-start flex-col">
                           <TextField isInvalid={errors.password} className='w-full' aria-label='Password'>
                          <label className='mb-3' >Password</label>
                           <Input type="text"  className='w-full border border-gray-500' {...register("password")} />
                            <FieldError>{errors.password?.message}</FieldError>
                           </TextField>
                        </div>
                        <div className="flex py-2 px-1 items-start flex-col">
                          <TextField isInvalid={errors.newPassword} className='w-full' aria-label='New Password'>
                          <label className='mb-3'>New Password</label>
                           <Input   type="text" className='w-full border border-gray-500'  {...register("newPassword")} />
                       <FieldError>{errors.newPassword?.message}</FieldError>
                        </TextField>
                        </div>
                         <Button slot="close" className='w-full' type='submit'>
                        {isLoading ? <FaSpinner className="w-3.5 h-3.5" /> :"Save" }
                        </Button>
                        </form>
                      </Surface>
                    </Modal.Body>
                    <Modal.Footer>
                      
                    </Modal.Footer>
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>
           
  )
}
