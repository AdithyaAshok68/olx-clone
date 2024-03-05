import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/config"; // Import your Firebase authentication module

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);

function Context ({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // User is signed in.
                setUser(authUser);
            } else {
                // No user is signed in.
                setUser(null);
            }
        });

        // Cleanup function
        return () => unsubscribe();
    }, []); // Run this effect only once on component mount

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default Context;