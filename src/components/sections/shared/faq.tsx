import Container from "@/components/container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "Dịch vụ tư vấn danh mục đầu tư tài chính cá nhân của chúng tôi hoạt động ra sao?",
    answer: "Chúng tôi đóng vai trò là chuyên gia cố vấn tài chính độc lập chuẩn mực Fiduciary. Chúng tôi phân tích thu nhập, chi tiêu, nợ và mức độ chấp nhận rủi ro để thiết kế danh mục phân bổ tài sản may đo như Cổ phiếu, Quỹ mở, Trái phiếu, Vàng, Bất động sản. Bạn tự tay sở hữu và giải ngân trên chính tài khoản của bạn, chúng tôi đồng hành tư vấn và định kỳ tái cân bằng danh mục.",
  },
  {
    question: "Chúng tôi có trực tiếp giữ tiền hoặc tài sản đầu tư của bạn không?",
    answer: "Tuyệt đối không! Tiền và toàn bộ danh mục tài sản luôn nằm 100% tại tài khoản chứng khoán, ngân hàng hoặc công ty quản lý quỹ do chính bạn đứng tên tại các tổ chức uy tín được Nhà nước cấp phép. Chúng tôi chỉ đưa ra khuyến nghị phân bổ chiến lược, bạn hoàn toàn làm chủ tài sản của mình.",
  },
  {
    question: "Chiến lược phân bổ danh mục của chúng tôi dựa trên phương pháp luận nào?",
    answer: "Chúng tôi ứng dụng Thuyết danh mục hiện đại Modern Portfolio Theory của GS. Harry Markowitz - Nobel Kinh tế 1990 - kết hợp với triết lý đầu tư giá trị và Biên an toàn của Benjamin Graham & Warren Buffett: Đa dạng hóa để triệt tiêu tối đa rủi ro phi hệ thống và tập trung vào các tài sản tạo dòng tiền thực chất.",
  },
  {
    question: "Tôi cần có số vốn tối thiểu bao nhiêu để bắt đầu nhận tư vấn?",
    answer: "Chúng tôi có các gói tư vấn linh hoạt: từ người trẻ đang bắt đầu hành trình tích lũy tài sản đầu đời với số vốn từ vài chục triệu đồng đến các gia đình hoặc cá nhân có tài sản ròng cao HNWI cần hoạch định danh mục đa lớp phức tạp và kế thừa gia sản.",
  }
];

const FAQ = () => {
  return (
    <section id="hoi-dap" className="scroll-mt-4 md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12">
      <Container>
        <AnimateOnView once blur>
          <div className="text-center mb-8 md:mb-20 max-w-2xl mx-auto">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-2 inline-block">
              Giải đáp thắc mắc
            </span>
            <h2 className="h2 mb-4">Câu Hỏi Thường Gặp Về Dịch Vụ Cố Vấn</h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Mọi điều bạn cần biết về nguyên tắc cố vấn độc lập, tính an toàn của tài sản và quy trình đồng hành cùng chúng tôi.
            </p>
          </div>
        </AnimateOnView>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-center">
          <AnimateOnView once className="max-w-[480px] w-full">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-card border border-border shadow-card p-6 flex items-center justify-center">
              <img
                src="/images/common/logo.svg"
                alt="Monarch Securities"
                className="w-4/5 h-auto object-contain"
              />
            </div>
          </AnimateOnView>

          <div className="max-w-[560px] w-full">
            <AnimateOnView once y={40}>
              <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-border px-0">
                    <AccordionTrigger className="text-left py-5 hover:no-underline [&>svg]:hidden cursor-pointer group">
                      <span className="h4 text-lg md:text-xl pr-6 font-semibold group-hover:text-primary transition-colors">
                        {faq.question}
                      </span>
                      <div className="relative flex items-center justify-center w-6 h-6 shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                        <Minus className="absolute w-5 h-5 transition-transform duration-300 scale-0 rotate-90 group-data-[state=open]:scale-100 group-data-[state=open]:rotate-0" />
                        <Plus className="absolute w-5 h-5 transition-transform duration-300 scale-100 rotate-0 group-data-[state=open]:scale-0 group-data-[state=open]:rotate-90" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-muted-foreground text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimateOnView>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
