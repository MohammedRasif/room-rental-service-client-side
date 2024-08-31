import { useState } from "react";
import AddRoomForm from "../../../components/Dashboard/From/AddRoomFrom";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const [loading,setLoading]=useState(false)
    const {user} = useAuth()

    const [dates,setDates] = useState({
        
            startDate: new Date(),
            endDate: null,
            key: 'selection'
          
    })

    //data range handle 
    const handleDates = item =>{
        console.log(item)
        setDates(item.selection)
    }

    const{mutateAsync} = useMutation({
        mutationFn:async(roomData)=>{
            const {data} = await axiosSecure.post('/room',roomData)
            return data
        },
        onSuccess:()=>{
            console.log('Data Saved Successfully')
            toast.success('Room Added Successfully')
            navigate('/dashboard/my-listings')
            setLoading(false)
        }
    })

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const form = e.target 
        const location = form.location.value 
        const category = form.category.value 
        const title = form.title.value 
        const to = dates.endDate
        const from = dates.startDate
        const price = form.price.value 
        const quests = form.total_guest.value 
        const bathrooms = form.bathrooms.value 
        const description = form.bathrooms.value 
        const bedrooms = form.bedrooms.value
        const image = form.image.files[0]
        const host = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
        }
        try{
            const image_url = await imageUpload(image)
            const roomData ={location,category,title,to,from,price,quests,bathrooms,bedrooms,host,description,image:image_url}

            console.table(roomData)
            //post request to server
            await mutateAsync(roomData)


        }catch(error){
            console.log(error)
            toast.error(error.message)
            setLoading(false)
        }
        // const image_url = await imageUpload(image)
        // console.log(image_url)

    }
    return (
        <div>
            <Helmet>
                <title>Add Room | Dashboard</title>
            </Helmet>
            {/* from */}
            <AddRoomForm dates={dates}
             handleDates={handleDates}
             handleSubmit={handleSubmit}
             loading={loading}

              ></AddRoomForm>
        </div>
    );
};

export default AddRoom;