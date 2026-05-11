 
import {Button, Input, Label, Modal, Surface ,TextArea} from "@heroui/react";
import { useRef, useState } from "react";
import { ImFilePicture } from "react-icons/im";
import { createPost, sharePost, UpdatePost } from "../../services/postServices";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

export function ShareFormModal({ isOpen, onOpen, onOpenChange ,callBack,id}) {
  const [isLoading, setIsLoading] = useState(false);
  const[postContent,setPostContent] = useState("");
 async  function handleSharePost(){
    try {
     setIsLoading(true);
      const formData = new FormData();  
      formData.append("body",postContent);
      const response = await sharePost(id,formData);
      console.log(response);
      toast.success(response.data.message);
      callBack();
    } catch (error) {
      console.log(error);
        toast.error('Failed to share post');  
    }finally{
        setIsLoading(false);
    }
   }

  return (
    <Modal isOpen={isOpen} onOpenChange={()=>{
        onOpenChange();
    }}>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
               
              <Modal.Heading>Share Post</Modal.Heading>
              
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4"> 
                <TextArea rows={7} placeholder="What on Your Mind ?"  onChange={(e)=>setPostContent(e.target.value)}/>
                 
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" className='w-full' onClick={()=>handleSharePost()} isDisabled={!postContent}>
                {isLoading ? <FaSpinner className="w-3.5 h-3.5" /> :"Share" }
                </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}