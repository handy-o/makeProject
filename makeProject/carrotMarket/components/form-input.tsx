interface formInputProps {
    defaultValue?: string,
    name: string,
    type: string,
    placeholder: string,
    required: boolean,
    errors?: string[],
}

export default function Input({defaultValue, name, type, placeholder, required, errors = []}: formInputProps) {
    return (
        <div>
            {/* 14 버전 : refresh 안되고 input 에 값 남아있음
                15 버전 : refresh 되면서 input 다 날아감 */}
            <input 
                defaultValue={defaultValue}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                className="w-full h-8 border border-1 border-solid border-gray-300 rounded-2xl focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-gray-400 p-1 pl-10"/>

            {errors.map((error, index) => (
                <span key={index} className="text-red-500 font-medium">
                    {error}<br/>
                </span>
            ))}
       </div>
    )
}