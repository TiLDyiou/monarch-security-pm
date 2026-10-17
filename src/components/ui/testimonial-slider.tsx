import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import * as React from "react"

interface Testimonial {
    id: number
    quote: string
    author: string
    role: string
    image: string
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote:
            "Quy tắc số 1: Không bao giờ để mất tiền. Quy tắc số 2: Không bao giờ quên quy tắc số 1. Cơ hội tuyệt vời nhất đến khi người khác hoảng loạn, và sự kiên định kỷ luật là vũ khí tối thượng của mọi nhà đầu tư lớn.",
        author: "Warren Buffett",
        role: "Huyền thoại Đầu tư & Chủ tịch kiêm CEO Berkshire Hathaway",
        image: "/images/home/warren-buffett.webp",
    },
    {
        id: 2,
        quote:
            "Đảo ngược, hãy luôn đảo ngược: Thay vì cố gắng tìm cách thành công phi thường, hãy tránh phạm phải những sai lầm ngớ ngẩn mà hầu hết mọi người đều mắc phải. Người kiên nhẫn và lý trí luôn làm chủ cuộc chơi tài chính.",
        author: "Charlie Munger",
        role: "Bậc thầy Đa ngành & Cố Phó Chủ tịch Berkshire Hathaway",
        image: "/images/home/charlie-munger.webp",
    },
    {
        id: 3,
        quote:
            "Đa dạng hóa là bữa trưa miễn phí duy nhất trong đầu tư. Bằng cách kết hợp các tài sản không biến động hoàn toàn cùng chiều, bạn có thể giảm thiểu tối đa rủi ro mà không phải đánh đổi tỷ suất sinh lời kỳ vọng.",
        author: "Harry Markowitz",
        role: "Giải Nobel Kinh tế 1990, Cha đẻ Thuyết Danh mục Hiện đại MPT",
        image: "/images/home/harry-markowitz.webp",
    },
    {
        id: 4,
        quote:
            "Trong ngắn hạn, thị trường là một chiếc máy bỏ phiếu cảm xúc; nhưng trong dài hạn, nó là một chiếc bàn cân đo lường giá trị thực. Cốt lõi của mọi quyết định tài chính bền vững chỉ gói gọn trong 3 từ: Biên An Toàn.",
        author: "Benjamin Graham",
        role: "Cha đẻ của Đầu tư Giá trị, Tác giả 'Nhà đầu tư Thông minh'",
        image: "/images/home/benjamin-graham.webp",
    },
    {
        id: 5,
        quote:
            "Thị trường có thể duy trì trạng thái phi lý trí lâu hơn khoảng thời gian bạn có thể duy trì khả năng thanh toán. Khó khăn lớn nhất trong quản trị tài chính không nằm ở việc nảy sinh ý tưởng mới, mà là thoát khỏi những thói quen cũ.",
        author: "John Maynard Keynes",
        role: "Nhà Kinh tế học Lỗi lạc Thế kỷ 20, Nhà kiến tạo Kinh tế học Vĩ mô",
        image: "/images/home/john-maynard-keynes.webp",
    },
    {
        id: 6,
        quote:
            "Không phải từ lòng nhân từ của người bán thịt, người nấu bia hay người làm bánh mì mà chúng ta có bữa tối, mà là từ sự theo đuổi lợi ích chính đáng của chính họ. Khi mỗi cá nhân tự do phát triển, toàn bộ nền kinh tế sẽ phồn vinh.",
        author: "Adam Smith",
        role: "Cha đẻ Kinh tế học Hiện đại, Tác giả 'Của cải của các Quốc gia'",
        image: "/images/home/adam-smith.webp",
    },
]

const TestimonialSlider = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [direction, setDirection] = React.useState(0)

    const next = () => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prev = () => {
        setDirection(-1)
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const current = testimonials[currentIndex]

    return (
        <div className="w-full max-w-6xl mx-auto overflow-hidden">
            <div className="relative min-h-[440px] md:h-[400px] flex items-center pb-4 md:pb-8">
                <div className="flex gap-6 items-center w-full relative">
                    {/* Active Testimonial Card */}
                    <motion.div
                        layout
                        key={`active-${current.id}`}
                        className="flex-shrink-0 flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full md:w-[72%] z-20"
                        initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        <div className="relative md:w-80 md:h-80 h-64 w-64 flex-shrink-0 overflow-hidden rounded-2xl border border-border shadow-xl bg-card group">
                            <img
                                src={current.image}
                                alt={current.author}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                            <div className="absolute bottom-3 left-3 right-3 text-center md:hidden">
                                <p className="text-white font-semibold text-sm">{current.author}</p>
                                <p className="text-primary text-xs truncate">{current.role}</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between h-full max-w-lg text-center md:text-left">
                            <div>
                                <Quote className="w-9 h-9 text-primary/40 mb-3 mx-auto md:mx-0" />
                                <p className="text-lg md:text-xl font-normal text-slate-800 leading-relaxed mb-6 italic">
                                    "{current.quote}"
                                </p>
                            </div>
                            <div className="pt-3 border-t border-border">
                                <p className="text-lg font-bold text-foreground">{current.author}</p>
                                <p className="text-sm text-primary font-medium">{current.role}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Next Testimonial Cards (Preview) */}
                    <div className="hidden md:flex gap-5 flex-1 relative h-80 items-center">
                        {testimonials.map((_, i) => {
                            const index = (currentIndex + i + 1) % testimonials.length
                            if (i >= 2) return null

                            const previewItem = testimonials[index]

                            return (
                                <motion.div
                                    key={`preview-${previewItem.id}`}
                                    layout
                                    onClick={() => {
                                        setDirection(1)
                                        setCurrentIndex(index)
                                    }}
                                    title={`Xem trích dẫn của ${previewItem.author}`}
                                    className="cursor-pointer flex-shrink-0 w-60 h-80 flex flex-col justify-end p-4 relative rounded-2xl overflow-hidden border border-border/60 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-[1.03] transition-all duration-300 shadow-md"
                                    initial={{ opacity: 0, x: direction > 0 ? 120 : -120 }}
                                    animate={{ opacity: 0.45, x: 0 }}
                                    exit={{ opacity: 0, x: direction > 0 ? -120 : 120 }}
                                    transition={{
                                        type: "spring",
                                        damping: 30,
                                        stiffness: 250,
                                        delay: i * 0.05,
                                    }}
                                >
                                    <img
                                        src={previewItem.image}
                                        alt={previewItem.author}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                    <div className="relative z-10">
                                        <p className="text-sm font-bold text-white leading-tight mb-1">{previewItem.author}</p>
                                        <p className="text-xs text-zinc-300 line-clamp-1">{previewItem.role}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center md:justify-start gap-4 mt-4 pt-4 border-t border-border">
                <button
                    onClick={prev}
                    className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center hover:bg-slate-100 hover:border-primary/50 shadow-sm transition-all group cursor-pointer"
                    aria-label="Vĩ nhân trước"
                >
                    <ChevronLeft className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
                <button
                    onClick={next}
                    className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center hover:bg-slate-100 hover:border-primary/50 shadow-sm transition-all group cursor-pointer"
                    aria-label="Vĩ nhân tiếp theo"
                >
                    <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
            </div>
        </div>
    )
}

export default TestimonialSlider
