import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

export interface NewsletterProps extends React.FormHTMLAttributes<HTMLFormElement> {
  placeholder?: string;
  className?: string;
}

const Newsletter = React.forwardRef<HTMLFormElement, NewsletterProps>(
  ({ placeholder = "Nhập email của bạn...", className, ...props }, ref) => {
    const [contact, setContact] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!contact.trim()) return;
      setSubmitted(true);
      toast.success("Đăng ký nhận bản tin thành công!", {
        description: "Bạn sẽ nhận được báo cáo phân tích danh mục và kinh tế vĩ mô định kỳ qua email.",
      });
    };

    if (submitted) {
      return (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "flex items-center gap-3 w-full max-w-[520px] min-h-[58px] rounded-[56px]",
            "bg-white border border-border shadow-sm",
            "px-[22px] py-3 text-foreground",
            className
          )}
        >
          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
          <span className="text-[15px]">Cảm ơn bạn đã đăng ký nhận bản tin!</span>
        </div>
      );
    }

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn(
          "flex items-center w-full max-w-[520px] h-[58px] rounded-[56px]",
          "bg-white border border-border shadow-sm hover:border-primary/50 transition-colors",
          "px-[20px] py-[6px] pr-[6px]",
          "font-normal text-[16px] leading-[140%] tracking-[-0.02em] text-foreground",
          className
        )}
        {...props}
      >
        <label htmlFor="newsletter-contact" className="sr-only">Email</label>
        <input
          id="newsletter-contact"
          type="email"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "flex-1 h-full w-full bg-transparent border-0 outline-none",
            "text-foreground placeholder:text-muted-foreground",
            "font-normal text-[16px] leading-[140%] tracking-[-0.02em]",
            "pr-2"
          )}
          style={{
            fontFamily: "'Inter Tight', sans-serif",
          }}
        />
        <Button
          type="submit"
          variant="form"
          className="flex-shrink-0 cursor-pointer font-semibold px-5 text-sm"
        >
          Đăng ký
        </Button>
      </form>
    );
  }
);

Newsletter.displayName = "Newsletter";

export { Newsletter };
