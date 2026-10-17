import Container from "@/components/container"
import { AnimateOnView } from "@/components/ui/motion/animate-on-view"
import TestimonialSlider from "@/components/ui/testimonial-slider"

const Testimonials = () => {
    return (
        <section id="danh-gia" className="py-12 md:py-[60px] relative overflow-hidden scroll-mt-4">
            <Container>
                <AnimateOnView
                    blur
                    className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
                >
                    <p className="text-muted-foreground text-base md:text-lg">
                        Kim chỉ nam soi đường cho phương pháp luận phân bổ danh mục khoa học, quản trị rủi ro và tăng trưởng tài sản bền vững của chúng tôi.
                    </p>
                </AnimateOnView>
                <TestimonialSlider />
            </Container>
        </section>
    )
}

export default Testimonials
