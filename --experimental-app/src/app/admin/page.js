'use client'
import React from "react";
import { useState } from 'react';
import { useAuthContext } from "../../context/authContex";
import { useRouter } from "next/navigation";
import addData from "../../firebase/firestore/addData";
import getDocument from "../../firebase/firestore/getData";

function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    const [data,setData] = useState({
        name:'',
        house:''
    })

    const handleAddData= async () => {
        const data = {
          name: 'John snow',
          house: 'Stark'
        }
        const { result, error } = await addData('users', 'user-id', data)
    
        if (error) {
          return console.log(error)
        }
        console.log('result',result)
    }

    const handleViewData = async () => {
        const { result, error } = await getDocument('users', 'user-id')
        if (error) {
            return console.log(error)
          }
          setData({name:result.name,house:result.house})
        console.log('viewData',result)
    }

    return (
        <div>
            <h1>Only logged in users can view this page</h1>


            <div className="space-x-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={handleAddData}
                >
                    Add data
                </button>

                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={handleViewData}
                >
                    View Data
                </button>

            </div>

            <p>{data.name}</p>
            <p>{data.house}</p>
         

        </div>

    );
}

export default Page;