 
import {Button, Input, Label, Modal, Surface ,TextArea} from "@heroui/react";
import { useRef, useState } from "react";
import { ImFilePicture } from "react-icons/im";
import { createPost, UpdatePost } from "../../services/postServices";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

export function FomModal({ isOpen, onOpen, onOpenChange ,callBack ,action,image=null,body=null,id=null}) {
  const [isLoading, setIsLoading] = useState(false);
  const[displayedPhoto,setDisplayedPhoto] = useState("");
  const[sendPhoto,setSendPhoto] = useState("");
  const[postContent,setPostContent] = useState("");
  const[modalHeader,setModalHeader] =useState(action =='create'? 'Create Post':'Edit Post');
  const inputPhoto = useRef();
  function handleUploadImage(){
  inputPhoto.current.click();
  } 
  function handleSelectedImage(){
   // console.log(inputPhoto.current.files[0]);
    // to send to api
    setSendPhoto(inputPhoto.current.files[0]);
    setDisplayedPhoto(URL.createObjectURL(inputPhoto.current.files[0]));
  } 
   async  function handlePostAction(){
        if(action ==='create'){
            handleCreatePost();
        }else if(action ==='edit'){
          handleEditPost();
        }
   }

 async  function handleCreatePost(){
    try {
     setIsLoading(true);
      const formData = new FormData();  
      formData.append("body",postContent);
      if(sendPhoto){
      formData.append("image",sendPhoto);
      }
       const response = await createPost(formData);
    if(response?.success){
     toast.success(response.data.message);
    }else{
       toast.error(response.message);
    }
      callBack();
    } catch (error) {
        toast.error('Failed to create post');  
    }finally{
        setIsLoading(false);
    }
   }

    async  function handleEditPost(){
    try {
     setIsLoading(true);
      const formData = new FormData();  
      formData.append("body",postContent);
      if(sendPhoto){
      formData.append("image",sendPhoto);
      }
     const response = await UpdatePost(id,formData);
    if(response?.success){
     toast.success(response.data.message);
    }else{
       toast.error(response.message);
    }
      callBack();
    } catch (error) {
      toast.error('Failed to edit post');
    }finally{
        setIsLoading(false);
    }
   }
  return (
    <Modal isOpen={isOpen} onOpenChange={()=>{
        onOpenChange();
        setDisplayedPhoto("");
        setModalHeader(modalHeader)
    }}>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
               
              <Modal.Heading>{modalHeader}</Modal.Heading>
              
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4"> 
                <TextArea rows={7} placeholder="What on Your Mind ?"  onChange={(e)=>setPostContent(e.target.value)}/>
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
              <Button slot="close" className='w-full' onClick={()=>handlePostAction()} isDisabled={!postContent}>
                {isLoading ? <FaSpinner className="w-3.5 h-3.5" /> :"Post" }
                </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}