import React from 'react';
import { useEffect, useState } from 'react';
import { getUserlist } from './userApi'

// au = Add or Update
function AuUsers () {

    const [ schUser, setSchUser] = useState();

    // sample
    const users = {

        "id": 1,
        "user_code": "one",
        "user_name": "string",
        "inactive": true,
        "phone_no": "string",
        "email_address": "string",
        "has_uploaded_page": true,
        "has_recognised_page": true,
        "has_confirmed_page": true,
        "has_posted_page": true,
        "role": "string",
        "color_text": "string",
        "color_background": "string"
    }
    

    const fetchSchUser = async () => {
        const response = await getUserlist();

        



    }

    return (
        <div>
            
        </div>
    );
};

export default AuUsers;