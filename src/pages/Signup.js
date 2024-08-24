import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";

const Signup = () => {

    const [data,setData] =useState({
        name:"",
        email:"",
        password:"",
        about:"",
    })

    const [error,setError] = useState({
        errors:{},
        isError:false,
    });

    //Handle Change
    const handleChange = (event,property)=>{
         setData({...data,
            [property]:event.target.value
         })
    }

    //Resetting the form
    const resetData = ()=>{
        setData({
            name:"",
            email:"",
            password:"",
            about:"",
        })
    }

    //Submit the form
    const submitForm = (event)=>{
        event.preventDefault();
        // if(error.isError)
        // {
        //     toast.error("Form data is invalid!! Enter valid data and submit");
        //     setError({
        //         ...error,
        //         isError:false
        //     })
        //     return;
        // }
        //Data validation


        //Call server api for sending data
        signUp(data).then((resp)=>{
            console.log(resp);
            console.log("Success log");
            toast.success("User registered successfully!! with user id: " + resp.id);
            setData({
                name:"",
                email:"",
                password:"",
                about:"",
            })
        }).catch((error)=>{
            console.log(error);
            console.log("Error log");
            //Handle errors in proper way
            toast.error(error.response.data.message);
            setError({
                errors:error,
                isError:true
            })
        })
    }


  return (
    <Base>
      <Container>
        <Row className="mt-4">

            {JSON.stringify(data)}
            <Col sm={{size:6,offset:3}}>
            <Card color="dark" inverse>
            <CardHeader>
                <h3>Fill information to Register !!!</h3>
            </CardHeader>

            <CardBody>
                <Form onSubmit={submitForm}>
                    {/*Name Field*/}
                    <FormGroup>
                        <Label for="name">Enter Name</Label>
                        <Input 
                        type="text"
                        placeholder="Enter name here..."
                        id="name"
                        value={data.name}
                        onChange={(e)=>handleChange(e, "name")}
                        invalid={error.errors?.response?.data?.name?true:false}
                        />
                        <FormFeedback>
                        {error.errors?.response?.data?.name}
                        </FormFeedback>
                    </FormGroup>

                    {/*Email Field*/}
                    <FormGroup>
                        <Label for="email">Enter Email</Label>
                        <Input 
                        type="email"
                        placeholder="Enter Email here..."
                        id="email"
                        value={data.email}
                        onChange={(e)=>handleChange(e, "email")}
                        invalid={error.errors?.response?.data?.email?true:false}
                        />
                        <FormFeedback>
                        {error.errors?.response?.data?.email}
                        </FormFeedback>
                    </FormGroup>

                    {/*Password Field*/}
                    <FormGroup>
                        <Label for="password">Enter Password</Label>
                        <Input 
                        type="password"
                        placeholder="Enter Password here..."
                        id="password"
                        value={data.password}
                        onChange={(e)=>handleChange(e, "password")}
                        invalid={error.errors?.response?.data?.password?true:false}
                        />
                        <FormFeedback>
                        {error.errors?.response?.data?.password}
                        </FormFeedback>
                    </FormGroup>

                    {/*About Field*/}
                    <FormGroup>
                        <Label for="about">Enter About</Label>
                        <Input 
                        type="textarea"
                        placeholder="Enter about you..."
                        id="about"
                        style={{height:"250px"}}
                        value={data.about}
                        onChange={(e)=>handleChange(e, "about")}
                        invalid={error.errors?.response?.data?.about?true:false}
                        />
                        <FormFeedback>
                        {error.errors?.response?.data?.about}
                        </FormFeedback>
                    </FormGroup>

                    <Container className="text-center">
                        <Button outline color="primary">Register</Button>
                        <Button onClick={resetData} outline type="reset" color="warning" className="ms-2">Reset</Button>
                    </Container>
                </Form>
            </CardBody>
        </Card>
            </Col>
        </Row>
        
      </Container>
    </Base>
  );
};

export default Signup;
