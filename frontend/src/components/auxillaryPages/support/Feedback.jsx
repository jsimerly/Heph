import { useState, useRef, useContext } from "react"
import useDropdown from "../../../hooks/useDropdown"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { BlueButton } from "../../utils"
import { fetchCreateCustomerFeedback } from "../../../api/fetchCustomer"
import { ShoppingContext } from '../../../context';

const feedbackOptions = [
    'Services',
    'Products',
    'Technology',
    'Other',
]

const Feedback = () => {
    window.scrollTo(0,0)
    const [open, setOpen, handleClick, node] = useDropdown()
    const {handleNotification} = useContext(ShoppingContext)

    const [feedbackType, setFeedbackType] = useState('')
    const feedbackInputRef = useRef()
    

    const handleSelection = (option) => {
        setOpen(false);
        setFeedbackType(option)
    }

    const handleSubmit = async () => {
        const data = {
          feedback_type: feedbackType,
          feedback: feedbackInputRef.current.value,
        };
    
        try {
          const response = await fetchCreateCustomerFeedback(data);
          if (response.ok) {
            handleNotification('Feedback submitted successfully!')
            // clear the feedback input field
            feedbackInputRef.current.value = '';
            setFeedbackType('');
          } else{
            handleNotification("Failed to submit Feedback, please make sure a type is selected and you're not over the 1000 character count.", null, true)
          }

        } catch (error) {
          console.error(error);
          alert('Failed to submit feedback');
        }
      };

  return (
    <div className="p-6 flex flex-col items-center text-neutralDark w-full">
        <div className="sm:w-[600px]">
            <h1 className="font-bold text-[20px] sm:text-[40px] w-full text-center">Feedback</h1>
            <p className="w-full">Please leave whatever feedback you may feel is relevant! We read ALL feedback sumbitions and respond to all feedback that is constructive. Thank you for helping to improve how we do business.</p>
            <h2 className="mt-3">Feedback Type</h2>
            <div ref={node} className='relative'>
                <div 
                    className="p-2 border border-primary bg-white w-full rounded-md flex flex-row justify-between group cursor-pointer"
                    onClick={handleClick}
                >
                    {feedbackType === '' ? 'Choose Type of Feedback' : feedbackType}
                    <ExpandMore className='group-hover:scale-125'/>
                </div>
                <div className={`${open ? '' : 'hidden'} w-full sm:w-[600px] my-2 bg-white rounded-md absolute shadow-md z-10`}>
                    <ul className="p-3 w-full space-y-1"> 
                    {feedbackOptions.map((option, i)=> (
                        <li 
                            className="hover:underline cursor-pointer z-10"
                            onClick={()=>handleSelection(option)}
                            key={i}
                        >
                            {option}
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            <h2 className="mt-3">Feedback Message</h2>
            <div className="w-full h-[300px] relative">
                <textarea
                    ref={feedbackInputRef}
                    style={{resize:'none'}}
                    className="w-full h-full border border-primary rounded flex justify-start align-text-top p-2 whitespace-normal outline-primary"
                    placeholder="Please leave whatever feedback you feel is relevant."
                />
                <span className="bottom-2 right-2 absolute text-neutralLight"> (Max Character Count: 1000)</span>
            </div>
            <div className='flex justify-center w-full mt-3'>
                <BlueButton content="Submit Feedback" onClick={handleSubmit} />
            </div>
        </div>
    </div>
  )
}

export default Feedback