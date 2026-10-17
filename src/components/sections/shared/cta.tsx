import lottieData from "@/assets/lottie/3 cards.json";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

const CTA = () => {
    return (
        <section className="relative overflow-hidden pt-20 md:pt-32">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-background" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00a0b0]/10 via-[#97b5ff]/10 to-background pointer-events-none" />

            <Container className="relative z-10 space-y-10">
                <StaggerContainer className="text-center max-w-3xl mx-auto">
                    <AnimateOnView blur>
                        <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-3 inline-block">
                          Khởi động lộ trình tài chính
                        </span>
                        <h2 className="h2 md:mb-5 mb-3 leading-tight font-extrabold">
                            Kiến Tạo Tự Do Tài Chính Với Danh Mục May Đo Chuẩn Mực
                        </h2>
                    </AnimateOnView>
                    <AnimateOnView blur delay={0.2}>
                        <p className='text-muted-foreground md:mb-10 mb-6 text-base md:text-lg'>
                            Đăng ký nhận buổi tư vấn chiến lược danh mục đầu tư cá nhân 1:1 miễn phí trong 30 phút cùng chuyên gia của chúng tôi.
                        </p>
                    </AnimateOnView>
                    <AnimateOnView>
                        <Button asChild size="lg" className="rounded-full px-8 font-semibold shadow-lg shadow-primary/20 cursor-pointer">
                            <Link to="/contact">
                                Đặt lịch tư vấn miễn phí ngay
                            </Link>
                        </Button>
                    </AnimateOnView>
                </StaggerContainer>
                <div className="w-full md:h-[288px] h-[140px] max-w-[840px] mx-auto">
                    <div className="aspect-[840/292] w-full">
                        <Lottie
                            animationData={lottieData}
                            loop={true}
                            className="w-full h-full"
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default CTA;
