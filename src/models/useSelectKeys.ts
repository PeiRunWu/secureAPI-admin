import React, {useState} from "react";

const useSelectKeys = () => {
    const [menuKeys, setMenuKeys] = useState<React.Key[]>([]);
    return {
        menuKeys,
        setMenuKeys,
    };
};

export default useSelectKeys;
