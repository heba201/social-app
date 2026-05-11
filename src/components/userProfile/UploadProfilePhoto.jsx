import React from 'react'
import { ImFilePicture } from "react-icons/im";
import {Button, Input, Modal, Surface ,TextArea} from "@heroui/react";
import { useRef, useState } from "react";
import { UploadUserPhoto } from '../../services/UserServices';
import { FaSpinner } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function UploadProfilePhoto({ isOpen, onOpen, onOpenChange , setProfilePhoto}) {
  const [isLoading, setIsLoading] = useState(false);
  const[displayedPhoto,setDisplayedPhoto] = useState("");
  const[sendPhoto,setSendPhoto] = useState("");
  const inputPhoto = useRef();
  function handleUploadImage(){
  inputPhoto.current.click();
  } 
  function handleSelectedImage(){
    // to send to api
    setSendPhoto(inputPhoto.current.files[0]);
    setDisplayedPhoto(URL.createObjectURL(inputPhoto.current.files[0]));
  } 


   async  function handleUploadPhoto(){
      try {
        setIsLoading(true);
        const formData = new FormData();   
        formData.append("photo",sendPhoto);
        const response = await UploadUserPhoto(formData);
        toast.success(response.data.message);
        console.log(response);
        setProfilePhoto(response.data.data.photo);
      } catch (error) {
          toast.error('Failed to upload photo');  
      }finally{
          setIsLoading(false);
      }
     }

      return (
         <Modal isOpen={isOpen}  onOpenChange={() => {
    onOpenChange();
    setDisplayedPhoto("");
  }}>
              <Modal.Backdrop>
                <Modal.Container placement="auto">
                  <Modal.Dialog className="sm:max-w-md">
                    <Modal.CloseTrigger />
                    <Modal.Header>
                      <Modal.Heading>Upload Profile Photo</Modal.Heading>
                    </Modal.Header>
                    <Modal.Body className="p-6">
                      <Surface variant="default">
                        <form className="flex flex-col gap-4"> 
                         {displayedPhoto && <img src={displayedPhoto}/>}
                         <div className="flex py-2 px-1 items-center gap-4">
                            <p className="text-lg font-semibold">Upload Picture</p>
                           <ImFilePicture onClick={()=>handleUploadImage()} className="text-green-500 cursor-pointer"/>
                           <Input type="file" onInput={()=>handleSelectedImage()} ref={inputPhoto}  className='hidden'/>
                            </div>
                        </form>
                      </Surface>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button slot="close" className='w-full' onClick={()=>handleUploadPhoto()} isDisabled={!sendPhoto}>
                        {isLoading ? <FaSpinner className="w-3.5 h-3.5" /> :"Save" }
                        </Button>
                    </Modal.Footer>
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>
  )
}
