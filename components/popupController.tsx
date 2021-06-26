import { useEffect, useRef, useState } from "react"
import { popupHandler } from "../utils"

function PopupController(initValue: boolean) {
    const [isActive, setIsActive] = useState<boolean>(initValue || false)
    const refOutside = useRef(null)

    useEffect(() => {
        function eventHandler(event) {
            if (isActive && refOutside.current && !refOutside.current.contains(event.target)) {
                popupHandler(false, setIsActive)
            }
        }

        function keyHandler(event) {
            if (isActive && event.key === "Escape") {
                popupHandler(false, setIsActive)
            }
        }

        document.addEventListener("click", eventHandler)
        document.addEventListener("keydown", keyHandler)

        return () => {
            document.removeEventListener("click", eventHandler)
            document.removeEventListener("keydown", keyHandler)
        }
    }, [isActive])

    return { isActive, setIsActive, refOutside }
}

export default PopupController