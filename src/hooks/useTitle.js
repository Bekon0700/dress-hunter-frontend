import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} | dressHunter, Be fashionable at minimum expense`;
    }, [title])
};

export default useTitle;