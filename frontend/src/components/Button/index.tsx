
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children?: React.ReactNode;
}
export default function Button({children, ...props}: ButtonProps) {
    return (
        <button className="btn btn-primary" {...props} >
            {children}
        </button>
    );
}
