import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export default function Hero() {
  return (
    <section className="h-[60vh] lg:h-[80vh] bg-center bg-no-repeat bg-cover"
    style={{ backgroundImage: `url('/hero/bg.jpg')` }}>
        <div className="container mx-auto h-full flex justify-center items-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="h1 text-white text-center max-w-[800px] mb-8">
                    Experience hospitality at its finest
                </h1>
                <Button size='lg'><Link to="/rooms">Discover more</Link></Button>
            </div>
        </div>
    </section>
  )
}
