import React, {useState, useEffect} from 'react'
import { CardImg, Button, ListGroup, ListGroupItem, Spinner} from 'reactstrap';
import './cards.css';
import axios from 'axios';

const Violations = ({ violations, loading, modal}) => {

    const [ticketors, setTicketors] = useState([
        {
            userId: '1234',
            name: 'blank blank'
        }
    ]);

    if(loading) {
        return <h2>
            {
                loading && <Spinner type="grow" color="warning" style={{ width: '3rem', height: '3rem' }}/>
            } 
        </h2>; // spinner
    }

<<<<<<< HEAD
    
    // matches user id to ticketor name, not being used
    function getTicketorName(user_id) {
        let obj, exists = false;
        ticketors.map(user => {
            if(user.userId === user_id){
                exists = true;
=======
    function editViolation(user_id) {
 
        axios.get(`http://api.parkingmanagerapp.com/auth/user_info/${user_id}`, { withCredentials:true,})
		.then(result => {
			if (result.status === 200) {
                setTicketor(result.data.first_name + " " + result.data.last_name);
>>>>>>> make-deployable
            }
        })
        if(!exists) {
            axios.get(`/auth/user_info/${user_id}`, { withCredentials:true,})
            .then(result => {
                if (result.status === 200) {
                    obj = {
                        userId: user_id,
                        name:   (result.data.first_name + " " + result.data.last_name)
                    };
                    setTicketors(result => [...result, obj]);
                    // console.log((result.data.first_name + " " + result.data.last_name));
                    // return <div>{(result.data.first_name + " " + result.data.last_name)}</div>;
                }
            })
            .catch(error => {
                console.log('fail');
            });
        }
    }

    return (
        
        <div className="row ">
            <div class="container-fluid">
                <div class="row card-group">
        
                    {violations.map(violation => (
                        <div key={violation._id} class="col-sm d-flex ">
                            <div class="card card-body flex-fill shadow-lg">
                                <CardImg top width="100%" src={"data:image/png;base64," + violation.image.data} alt="image" />
                                <ListGroup flush>
                                    <ListGroupItem className="pl-0 pb-0 border-dark">

                                        <span className="badge badge-primary text-wrap p-2 px-3 mr-1" > Ticket ID</span>
                                            {violation._id}
                                    
                                    </ListGroupItem>
                                    <ListGroupItem className="pl-0 pb-0">

                                        <span className="badge badge-primary text-wrap p-2 px-3 mr-1" > Ticketor</span>
                                            {/*getTicketorName(violation._userId)*/}
                                            {/*ticketors.map(obj => (obj.userId === violation._userId ? obj.name : ""))*/}
                                            {violation.ticketor_name}
                                    </ListGroupItem>
                                    <ListGroupItem className="pl-0 pb-0">

                                        <span className="badge badge-primary text-wrap p-2 px-3 mr-1" > License Plate</span>
                                            {violation.license_plate}

                                    </ListGroupItem>
                                    <ListGroupItem className="pl-0 pb-0">

                                        <span className="badge badge-primary text-wrap p-2 px-3 mr-1" > Violation Type</span>
                                            {violation.violation_type}

                                    </ListGroupItem>
                                    <ListGroupItem className="pl-0 pb-0">

                                        <span className="badge badge-primary text-wrap p-2 px-3 mr-1" > Date</span>
                                            {violation.createdAt}

                                    </ListGroupItem>
                                    <ListGroupItem className="pl-0 pb-0">

                                        <span className="badge badge-primary text-wrap p-2 px-3 mr-1" > Location</span>
                                            {violation.location}

                                    </ListGroupItem>
                                    <ListGroupItem className="pl-0 pb-0">

                                        <span className="badge badge-primary text-wrap p-2 px-3 mr-1" >Status</span>
                                            {violation.status}

                                    </ListGroupItem>
                                    <ListGroupItem className="pl-0 pb-0 border-0">

                                        <span className="badge badge-primary text-wrap p-2 px-3 mr-1" > Description</span>
                                            {violation.description}

                                    </ListGroupItem>                      
                                 </ListGroup>
                                 <Button onClick={() => modal(violation._id)} outline color="primary" size="sm" className="mt-auto ml-auto rounded-pill">Modify</Button>
                                 
                            </div>
                        </div>
                    ))}
                </div>  
            </div>
        </div>
            
    );
    
        
    
};

export default Violations;
