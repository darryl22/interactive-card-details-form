import React from "react";
import Final from "./Final";

function App() {
    const [formData, setFormData] = React.useState({
        holdername: "",
        cardnumber: "",
        month: "",
        year: "",
        cvc: ""
    })
    const [complete, setComplete] = React.useState(false)
    const [error, setError] = React.useState({
        card: false,
        month: false,
        year: false,
        cvc: false
    })

    const errorStyle = {
        margin: "0px",
        padding: "0px",
        color: "red",
        fontSize: "0.8em"
    }

    function handleChange(e) {
        let {name, value} = e.target
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })

        console.log(formData)
    }

    function formatCard(e) {
        console.log(e.key)
        let val = e.target.value
        if (val.length > 0 && e.key !== "Backspace"){
            if (val.split(" ").join("").length % 4 === 0 && val.length < 19) {
                e.target.value += " "
            }
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        let pattern = /[a-zA-Z]/
        if (formData.month === ""){
            setError(prev => {
                return {
                    ...prev,
                    month: true
                }
            })
        }else if(formData.year === ""){
            setError(prev => {
                return {
                    ...prev,
                    year: true
                }
            })
        } else if (pattern.test(formData.cardnumber)) {
            setError(prev => {
                return {
                    ...prev,
                    card: true
                }
            })
        } else if(formData.cvc === "") {
            setError(prev => {
                return {
                    ...prev,
                    cvc: true
                }
            })
        } else{
            setComplete(true)
        }
    }

    return(
        <div className='main-container'>
            <div className='image-div'>
                <div className="cardone">
                    <div style={{display: "flex", alignItems: "center", margin: "5%"}}>
                        <div className="circle-one"></div>
                        <div className="circle-two"></div>
                    </div>
                    <div style={{margin: "0px 5%"}}>
                        <p className="card-no">{formData.cardnumber === "" ? "0000 0000 0000 0000" : formData.cardnumber}</p>
                        <div style={{display: "flex", justifyContent: "space-between", color: "white"}} className="date-name"> 
                            <p>{formData.holdername === "" ? "Jane Appleseed" : formData.holdername.toUpperCase()}</p>
                            <p>{formData.month === "" ? "00" : formData.month}/{formData.year === "" ? "00" : formData.year}</p>
                        </div>
                    </div>
                </div>
                <div className="cardtwo">
                    <p>{formData.cvc === "" ? "000" : formData.cvc}</p>
                </div>
            </div>

            <div className='form-div'>
                {!complete ? <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="holdername">CARDHOLDER NAME</label>
                    <input name="holdername" placeholder="e.g. Jane Appleseed" value={formData.holdername} onChange={handleChange} required/>

                    <label htmlFor="cardnumber">CARD NUMBER</label>
                    <input name="cardnumber" style={{border: error.card ? "1px solid red" : "1px solid hsl(270, 3%, 87%)"}} placeholder="e.g. 1234 5678 9123 0000" inputMode="numeric" minLength="19" maxLength="19" value={formData.cardnumber} onChange={handleChange} onKeyDown={formatCard} required/>
                    {error.card && <p style={errorStyle}>wrong format, numbers only</p>}
                    
                    <div style={{display: "flex"}}>
                        <div style={{width: "50%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            <label>EXP. DATE (MM/YY)</label>
                            <div style={{display: "flex"}}>
                                <input style={{marginRight: "10px", border: error.month ? "1px solid red" : "1px solid hsl(270, 3%, 87%)"}} placeholder="MM" maxLength="2" name="month" value={formData.month} onChange={handleChange}/>
                                <input style={{marginRight: "10px", border: error.year ? "1px solid red" : "1px solid hsl(270, 3%, 87%)"}} placeholder="YY" maxLength="2" name="year" value={formData.year} onChange={handleChange}/>
                            </div>
                            {(error.month || error.year) && <p style={errorStyle}>can't be blank</p>}
                        </div>

                        <div style={{width: "50%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                            <label>CVC</label>
                            <input placeholder="e.g. 123" name="cvc" maxLength="4" style={{border: error.cvc ? "1px solid red" : "1px solid hsl(270, 3%, 87%)"}} value={formData.cvc} onChange={handleChange}/>
                            {error.cvc && <p style={errorStyle}>can't be blank</p>}
                        </div>
                    </div>
                    <button className="submit-form">Confirm</button>
                </form> : <Final/>}
            </div>
        </div>
    )
}

export default App