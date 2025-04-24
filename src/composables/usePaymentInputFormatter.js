import { ref } from 'vue'

export function usePaymentInputFormatter() {
    const formatCardNumber = (value) => {
        let digitsOnly = value.replace(/\D/g, '').slice(0,16)
        return digitsOnly.replace(/(.{4})/g, '$1 ').trim()
    }

    const formatExpirationDate = (value) => {
        let digitsOnly = value.replace(/\D/g, '').slice(0, 6)
        
        if (digitsOnly.length >= 3) {
            return digitsOnly.slice(0, 2) + '/' + digitsOnly.slice(2)
        }
        
        return digitsOnly
    }

    return {
        formatCardNumber,
        formatExpirationDate
    }
}