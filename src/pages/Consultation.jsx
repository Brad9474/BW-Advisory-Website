import BookingSection from '../components/BookingSection';
import Footer from '../components/Footer';

const Consultation = () => (
  <>
    <main className="relative z-10 pt-40 md:pt-52 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <BookingSection variant="page" />
      </div>
    </main>
    <Footer />
  </>
);

export default Consultation;
