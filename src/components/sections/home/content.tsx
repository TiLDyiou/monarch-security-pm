import { AnimateOnView } from '@/components/ui/motion/animate-on-view';
import { StaggerContainer } from '@/components/ui/motion/stagger';
import { FrontierIllustration, RebalanceIllustration, RiskProfileIllustration } from './process-illustrations';
import Container from '../../container';

const streamlineFeatures = [
  {
    id: 1,
    title: "Thấu Hiểu Ngưỡng An Toàn Tài Chính & Mục Tiêu Gia Đình",
    description: "Đo lường mức độ chấp nhận rủi ro qua bài khảo sát chuẩn quốc tế, đồng thời sắp xếp lại thu chi và lập quỹ dự phòng để vững vàng hướng tới mục tiêu mua nhà, lo cho con cái và hưu trí.",
    Illustration: RiskProfileIllustration,
  },
  {
    id: 2,
    title: "Thiết Kế & Tối Ưu Hóa Danh Mục Đầu Tư",
    description: "Kết hợp hài hòa các cổ phiếu đầu ngành có nền tảng vững chắc với Trái phiếu Chính phủ an toàn theo mô hình toán học Markowitz, giúp tối ưu lợi nhuận kỳ vọng và kiểm soát biến động.",
    Illustration: FrontierIllustration,
  },
  {
    id: 3,
    title: "Giám Sát Tỷ Trọng & Tái Cân Bằng Kỷ Luật",
    description: "Không chạy theo tâm lý đám đông. Chúng tôi rà soát danh mục định kỳ mỗi 6 tháng để giữ vững tỷ lệ vàng giữa cổ phiếu và Trái phiếu Chính phủ, đồng thời ưu tiên tái đầu tư từ dòng tiền tiết kiệm hàng tháng nhằm tối ưu chi phí giao dịch.",
    Illustration: RebalanceIllustration,
  },
];

const Content = () => {
  return (
    <section id="quy-trinh" className="py-12 md:py-[60px] scroll-mt-4">
      <Container className="space-y-8 md:space-y-20">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-5 mb-3">
              Quy Trình Hoạch Định <span className="whitespace-nowrap">Danh Mục</span><br />Bài Bản &amp; Tinh Gọn
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground text-base md:text-lg">
              Gạt bỏ nỗi lo biến động thị trường và những quyết định mua bán cảm tính. Chúng tôi đồng hành cùng bạn xây dựng lộ trình tích lũy kỷ luật, gia tăng tài sản bền vững trong đúng ngưỡng an toàn của gia đình bạn.
            </p>
          </AnimateOnView>
        </StaggerContainer>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {streamlineFeatures.slice(0, 2).map((feature, index) => (
              <AnimateOnView
                key={feature.id}
                delay={index * 0.1}
              >
                <div className="border border-border bg-card rounded-[32px] overflow-hidden hover:border-[#00a0b0]/40 shadow-card hover:shadow-neumorphic transition-all duration-300">
                  <div className="w-full aspect-[4/3] sm:aspect-[519/317] p-4">
                    <feature.Illustration />
                  </div>
                  <div className="p-6 md:p-8 text-center md:text-left">
                    <h3 className="h4 text-xl font-bold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimateOnView>
            ))}
          </div>
          <AnimateOnView delay={0.2}>
            <div className="border border-border bg-card rounded-[32px] overflow-hidden hover:border-[#00a0b0]/40 shadow-card hover:shadow-neumorphic transition-all duration-300">
              <div className="w-full h-[300px] md:h-[320px] xl:h-[350px] p-4">
                <RebalanceIllustration />
              </div>
              <div className="p-6 md:p-8 text-center max-w-2xl mx-auto">
                <h3 className="h4 text-xl md:text-2xl font-bold mb-3">
                  {streamlineFeatures[2].title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {streamlineFeatures[2].description}
                </p>
              </div>
            </div>
          </AnimateOnView>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Content
