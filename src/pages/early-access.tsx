import Container from "@/components/container";
import EarlyAccessContent from "@/components/sections/early-access/early-access-content";
import { Link } from "react-router-dom";

const EarlyAccess = () => {
    return (
        <main className='bg-black'>
            <header className="w-full md:top-10 top-6 mx-auto absolute z-40">
                <Container className="flex justify-center items-center">
                    <Link to="/" className="flex items-center">
                        <img src="/images/common/logo.svg" alt="Monarch Securities" className="h-14 md:h-16 w-auto" />
                    </Link>
                </Container>
            </header>
            <EarlyAccessContent />
        </main>
    );
};

export default EarlyAccess;