import { AlarmClockCheck, Clock, X } from 'lucide-react';
import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getNotificationPermission, sendNotification } from '../service/notification';
import toast from 'react-hot-toast';


export default function Schedule({ title, noteId, handleCancel }) {

    const [dateTime, setDateTime] = useState('');

    const scheduleFunction = () => {
        const targetTime = new Date(dateTime).getTime();
        const currentTime = new Date().getTime();
        const delay = targetTime - currentTime;

        getNotificationPermission()

        if (delay > 0) {
            setTimeout(() => {
                sendNotification(title, noteId)
            }, delay);
            handleCancel()
            toast.success('Reminder set successfully')
        } else {
            toast.error('Please select a future date and time');
        }
    };

    return (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center mt-[-5rem]'>
            <div className="w-[300px] tudun flex flex-col p-5 py-8 gap-2 items-center justify-center bg-[#181818] shadow-lg rounded-2xl ">

                <span className='opacity-50'><AlarmClockCheck size={40} /></span>

                <h1 className='text-md text-center tracking-wide'>Get Reminded via Notification </h1>

                <DatePicker
                    className='bg-transparent my-border py-2 my-2 text-center rounded-md outline-none tracking-wide opacity-60 px-0 w-[200px]'
                    selected={dateTime}
                    onChange={date => setDateTime(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    placeholderText="Select Date and Time"
                />

                <div className='w-full flex justify-center overflow-hidden'>
                    <button
                        className=" bg-gray-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wider  text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-700 transition ease-in duration-300" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className="bg-violet-600 hover:bg-violet-800 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider text-white rounded-full transition ease-in duration-300 " onClick={scheduleFunction}>
                        Schedule
                    </button>
                </div>
            </div>
        </div>

    )
}
