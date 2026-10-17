import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import SectionLink from '@/components/section-link'
import { SECTIONS } from '@/lib/sections'
import Container from '../../container'
import { Button } from '../../ui/button'
import {
  FeatureCard,
  FeatureCardAction,
  FeatureCardContent,
  FeatureCardDescription,
  FeatureCardImage,
  FeatureCardTitle
} from '../../ui/feature-card'

const cards = [
  {
    id: 1,
    title: "Đầu Tư Đúng Người, Đúng Mục Tiêu",
    description: "Dựa trên mức rủi ro bạn chấp nhận, khả năng tiết kiệm và kế hoạch nghỉ hưu, chúng tôi chia vốn hợp lý vào cổ phiếu, ETF, trái phiếu và tài sản an toàn.",
    imageSrc: "/images/home/feature-1.png",
    imageAlt: "Thiết kế danh mục đầu tư cá nhân",
    buttonText: "Tìm hiểu phương pháp",
  },
  {
    id: 2,
    title: "Lợi Nhuận Tối Ưu, Rủi Ro Trong Tầm Kiểm Soát",
    description: "Chúng tôi phân tán vốn để giảm rủi ro theo lý thuyết danh mục hiện đại của Harry Markowitz, và chỉ mua khi giá đủ hấp dẫn theo nguyên tắc biên an toàn của Benjamin Graham. Nhờ vậy, danh mục của bạn sinh lời tốt nhất ở mức rủi ro bạn chấp nhận.",
    imageSrc: "/images/home/feature-2.webp",
    imageAlt: "Tối ưu hóa danh mục MPT",
    buttonText: "Khám phá chiến lược",
  },
  {
    id: 3,
    title: "Đội Ngũ Chuyên Viên Đồng Hành, Tái Cân Bằng Định Kỳ",
    description: "Chuyên gia cố vấn tài chính cấp cao trực tiếp theo dõi, hỗ trợ điều chỉnh tỷ trọng tài sản định kỳ trước biến động kinh tế vĩ mô nhằm bảo toàn thành quả đầu tư dài hạn.",
    imageSrc: "/images/home/feature-3.webp",
    imageAlt: "Đồng hành cố vấn 1:1",
  }
]

const Features = () => {
  return (
    <section id="dich-vu" className="py-12 md:py-[60px] bg-background scroll-mt-4">
      <Container className="space-y-8 md:space-y-20">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 mb-4">
              Mỗi nhà đầu tư một mục tiêu, một ngưỡng an toàn tài chính
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground text-base md:text-lg">
              Chúng tôi không đưa lời khuyên chung chung, chúng tôi xây lộ trình khoa học dành riêng cho bạn
            </p>
          </AnimateOnView>
        </StaggerContainer>
        <StaggerContainer className="max-w-[1062px] mx-auto md:space-y-[60px] space-y-8">
          {cards.map((card, index) => (
            <AnimateOnView
              delay={index * 0.1}
              key={card.id}
              className={`md:sticky md:top-24 z-10 bg-background md:rounded-[30px] rounded-lg`}
            >
              <FeatureCard imagePosition="right">
                <FeatureCardContent>
                  <FeatureCardTitle>{card.title}</FeatureCardTitle>
                  <FeatureCardDescription>{card.description}</FeatureCardDescription>
                  {card.buttonText && (
                    <FeatureCardAction>
                      <Button asChild>
                        <SectionLink to={SECTIONS.process}>
                          {card.buttonText}
                        </SectionLink>
                      </Button>
                    </FeatureCardAction>
                  )}
                </FeatureCardContent>
                <FeatureCardImage src={card.imageSrc} alt={card.imageAlt} />
              </FeatureCard>
            </AnimateOnView>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Features