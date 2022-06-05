import {useCallback, useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const auth = useContext(AuthContext)

    const request = useCallback(async (url, method='GET', body=null, headers={}) => {

        setLoading(true)

        try {

            const response = await axios({
                'method': method,
                'url': url,
                'data': body,
                'headers': {
                    'Authorization': `Bearer ${auth.token}`
                }
            })
                .catch((error) => {
                    throw new Error(error.message || 'Something wrong with request')
                })

            const data = response.data

            setLoading(false)

            return data

        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }

    }, [])

    const clearError = () => {
        setError(null)
    }

    return {loading, request, error, clearError}
}