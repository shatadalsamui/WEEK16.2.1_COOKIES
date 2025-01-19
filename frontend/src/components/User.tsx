import { useEffect, useState } from "react"; // import React and hooks
import axios from "axios";                        // import axios for HTTP requests
import { BACKEND_URL } from "../config";

interface UserData {                              // define UserData interface
    userId: string;                               // userId property
    // add other properties if needed
}

export const User = () => {                          // User component
    const [userData, setUserData] = useState<UserData | null>(null); // state with UserData type

    useEffect(() => {                             // useEffect hook runs on mount
        axios.get(`${BACKEND_URL}/user`, {        // send GET request to /user
            withCredentials: true,                // include credentials (cookies)
          })
            .then(res => {                        // on success
                setUserData(res.data);            // set userData from response
            })
    }, []);                                       // empty dependency array (run once)

    return <div>
        You're id is {userData?.userId}           {/* display userId if available */}
        <br /><br />
        <button onClick={() => {                  // logout button
            axios.post(`${BACKEND_URL}/logout`, {}, {
                withCredentials: true,            // include credentials
            })
        }}>Logout</button>
    </div>
}