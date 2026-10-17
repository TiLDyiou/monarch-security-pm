import CursorGrid from '@/components/CursorGrid'
import { Button } from '@/components/ui/button'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import SectionLink from '@/components/section-link'
import { SECTIONS } from '@/lib/sections'
import Container from '../../container'

const Confidence = () => {
  return (
    <section
      id="cam-ket"
      className="relative bg-background overflow-hidden lg:py-40 md:py-24 pt-12 pb-12">
      {/* Soft brand glow background */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] md:w-[760px] h-[300px] md:h-[460px] rounded-full bg-gradient-to-tr from-[#00a0b0]/20 to-[#97b5ff]/25 blur-[100px]" />
        <div className="absolute top-[18%] left-[8%] w-[220px] h-[220px] rounded-full bg-[#00a0b0]/10 blur-[80px] md:block hidden" />
        <div className="absolute bottom-[14%] right-[8%] w-[260px] h-[260px] rounded-full bg-[#97b5ff]/20 blur-[90px] md:block hidden" />
      </div>

      {/* Interactive grid: tiles light up under the cursor, ripple on click and glimmer at random when idle */}
      <div className="absolute inset-0 z-[1]" aria-hidden>
        <CursorGrid
          lightMode
          cellSize={36}
          gridStyle="crosses"
          color="#00a0b0"
          gridColor="#64748b"
          highlight="area"
          radius={130}
          cellRadius={6}
          cellGap={3}
          fillOpacity={0.08}
          maxOpacity={0.3}
          gridOpacity={0.12}
          spotlight={0.4}
          holdTime={300}
          fadeDuration={1100}
          ambient={0.12}
          pulseSpeed={700}
          edgeFade={0.25}
          clickPulse
        />
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <StaggerContainer className="text-center max-w-[660px] mx-auto">
          <AnimateOnView
            blur
          >
            <h2
              className="h2 md:mb-5 mb-3 leading-tight"
            >
              Cố Vấn Tài Chính Độc Lập: Lợi Ích Của Bạn Là Tối Thượng
            </h2>
          </AnimateOnView>
          <AnimateOnView
            blur
            delay={0.2}
          >
            <p
              className='text-muted-foreground md:mb-10 mb-6 text-base md:text-lg leading-relaxed'
            >
              Khác với các nhân viên môi giới cố gắng chào mời sản phẩm để nhận hoa hồng, chuyên gia của chúng tôi đóng vai trò là Cố vấn Độc lập (Fiduciary). Chúng tôi không nhận hoa hồng từ bên thứ ba, mọi chiến lược phân bổ đều xuất phát từ mục tiêu làm giàu bền vững cho bạn.
            </p>
          </AnimateOnView>
          <AnimateOnView>
            <Button asChild size="lg" className="rounded-full px-8 font-semibold shadow-lg shadow-primary/20 cursor-pointer">
              <SectionLink to={SECTIONS.contact}>
                Đăng ký nhận phân tích danh mục miễn phí
              </SectionLink>
            </Button>
          </AnimateOnView>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Confidence
