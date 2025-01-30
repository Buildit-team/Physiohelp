import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
    const [services, setServices] = useState('');
    const [painLocation, setPainLocation] = useState('');
    const [limitation, setLimitation] = useState('');
    const [painDuration, setPainDuration] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const formData = {
            services,
            painLocation,
            limitation,
            painDuration,
        };
        localStorage.setItem('appointmentData', JSON.stringify(formData));
        navigate('/book-appointment');
    };

    return (
        <div className="w-full mt-[100px] flex flex-col items-center">
            <div className="w-[50%] bg-white p-8 rounded-lg shadow-md max-[650px]:w-full">
                <span className='w-full flex flex-col items-center'>
                    <h1 className="text-[25px] font-medium mb-4">Essential Questions</h1>
                    <p className="text-gray-600 mb-6">Questions that will help us understand you better.</p>
                </span>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className=''>
                        <label className="block text-[20px] text-[#1053D4] ">What service do you need?</label>
                        <div className="mt-2 space-y-2 bg-[#F9F9FC] p-[10px]">
                            {[
                                "20 Minute Online Therapy Session",
                                "Physical Therapy Evaluation and Hands-On Treatment",
                                "20 Minute Physical Therapy “Discover Session”",
                                "Recommended Physiotherapy Tools",
                                "Mobility & Injury-Risk Assessment",
                                "Other"
                            ].map((service) => (
                                <label key={service} className="flex items-center">
                                    <input
                                        type="radio" 
                                        value={service}
                                        checked={services === service}
                                        onChange={(e) => setServices(e.target.value)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{service}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div >
                        <label className="block text-[20px] text-[#1053D4]">Where does it hurt?</label>
                        <div className='bg-[#F9F9FC] p-[10px]'>
                            <input
                                type="text"
                                value={painLocation}
                                onChange={(e) => setPainLocation(e.target.value)}
                                placeholder="Let us know where it hurts "
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-[lightgrey]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[20px] text-[#1053D4]">What does it limit you from doing?</label>
                        <div className='bg-[#F9F9FC] p-[10px]'>
                            <textarea
                                value={limitation}
                                onChange={(e) => setLimitation(e.target.value)}
                                placeholder="Tell us what you can’t/can barely do since the pain started."
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-[lightgrey]"
                            />
                        </div>
                    </div>

                    <div className=''>
                        <label className="block text-[20px] text-[#1053D4]">How long has this pain existed?</label>
                        <div className="mt-2 space-y-2 bg-[#F9F9FC] p-[10px]">
                            {[
                                "Less than 1-2 weeks",
                                "1-2 weeks",
                                "3-4 weeks",
                                "1-3 months",
                                "4 months - 1 year",
                                "Over a year"
                            ].map((option) => (
                                <label key={option} className="flex items-center">
                                    <input
                                        type="radio"
                                        value={option}
                                        checked={painDuration === option}
                                        onChange={(e) => setPainDuration(e.target.value)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <button
                            type="submit"
                            className="w-[150px] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1053D4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Appointment;