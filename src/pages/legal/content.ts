import type { Language } from '@/i18n/translations';

export type LegalDocKey = 'terms' | 'privacy';

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalDoc {
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
}

export const LEGAL_PATHS: Record<LegalDocKey, string> = {
  terms: '/legal/terms-&-condition',
  privacy: '/legal/privacy-policy',
};

interface LegalContent {
  updatedLabel: string;
  updated: string;
  docs: Record<LegalDocKey, LegalDoc>;
}

export const legalContent: Record<Language, LegalContent> = {
  vi: {
    updatedLabel: 'Cập nhật lần cuối',
    updated: '17/10/2026',
    docs: {
      terms: {
        title: 'Điều khoản sử dụng',
        description:
          'Những điều cần biết khi sử dụng Monarch Securities, website demo của đồ án môn Quản lý danh mục đầu tư.',
        intro:
          'Khi truy cập và sử dụng website này, bạn đồng ý với các điều khoản dưới đây. Hãy đọc kỹ, nhất là phần nói về tính chất minh họa của nội dung.',
        sections: [
          {
            heading: 'Monarch Securities là đồ án môn học',
            paragraphs: [
              'Monarch Securities là website do nhóm sinh viên xây dựng cho đồ án môn Quản lý danh mục đầu tư. Đây là thương hiệu giả định: Monarch Securities không phải công ty chứng khoán, không được Ủy ban Chứng khoán Nhà nước cấp phép và không cung cấp dịch vụ tài chính trên thực tế.',
            ],
          },
          {
            heading: 'Không phải lời khuyên đầu tư',
            paragraphs: [
              'Danh mục tối ưu (OCP), tỷ trọng cổ phiếu và trái phiếu, các chỉ số lợi nhuận, rủi ro và dự phóng tài sản trên website là kết quả tính toán của đồ án, dựa trên lý thuyết danh mục hiện đại (Markowitz) và các giả định của nhóm. Chúng không phải khuyến nghị mua, bán hay nắm giữ bất kỳ chứng khoán nào.',
              'Đầu tư chứng khoán luôn có rủi ro, kể cả rủi ro mất vốn. Kết quả trong quá khứ hay số liệu dự phóng không bảo đảm kết quả trong tương lai. Trước khi đầu tư thật, bạn nên tự tìm hiểu và tham khảo ý kiến của tổ chức tư vấn được cấp phép.',
            ],
          },
          {
            heading: 'Hồ sơ khách hàng là giả định',
            paragraphs: [
              'Gia đình anh Nam và chị Nữ trên trang Dashboard là hồ sơ khách hàng giả định, được xây dựng cho Tuyên bố Chính sách Đầu tư (IPS) giai đoạn 2026-2036 của đồ án. Mọi thông tin về thu nhập, chi tiêu, tài sản, khoản vay và mục tiêu tài chính đều do nhóm đặt ra. Nếu trùng khớp với người thật thì hoàn toàn là ngẫu nhiên.',
            ],
          },
          {
            heading: 'Dữ liệu thị trường',
            bullets: [
              'Giá cổ phiếu: lấy theo phiên giao dịch ngày từ API công khai của DNSE (Entrade), thông qua máy chủ trung gian của website. Nếu DNSE không phản hồi, website chuyển sang nguồn dự phòng là VNDIRECT.',
              'Tần suất cập nhật: biểu đồ giá tự làm mới khoảng 25 giây một lần. Do dữ liệu được lưu đệm để tải nhanh hơn, giá hiển thị có thể chậm vài phút so với bảng giá của sàn.',
              'Tin tức: lấy song song từ VNDIRECT và TCBS, nguồn nào phản hồi trước thì dùng nguồn đó. Bài viết thuộc bản quyền của trang nguồn, website chỉ hiển thị tiêu đề, tóm tắt và dẫn liên kết.',
              'Khi tất cả các nguồn đều không phản hồi: biểu đồ hiển thị dữ liệu giá mô phỏng và mục tin tức hiển thị bộ tin mẫu do nhóm soạn sẵn. Dữ liệu này chỉ giúp giao diện tiếp tục hoạt động, không phản ánh diễn biến thị trường thật.',
            ],
            paragraphs: ['Vì vậy, bạn không nên dùng dữ liệu trên website làm căn cứ để giao dịch.'],
          },
          {
            heading: 'Không có giao dịch tài chính',
            bullets: [
              'Website không nhận tiền, không thu phí và không xử lý thanh toán.',
              'Website không mở tài khoản chứng khoán và không đặt lệnh mua bán thay bạn.',
            ],
          },
          {
            heading: 'Thương hiệu của bên thứ ba',
            paragraphs: [
              'Tên và logo của các doanh nghiệp, ngân hàng, công ty chứng khoán xuất hiện trên website thuộc về chủ sở hữu tương ứng và chỉ dùng để minh họa. Việc xuất hiện trên website không có nghĩa là các đơn vị này hợp tác hay bảo trợ cho đồ án.',
            ],
          },
          {
            heading: 'Giới hạn trách nhiệm',
            paragraphs: [
              'Website được cung cấp theo hiện trạng, không kèm bảo đảm nào về độ chính xác, tính đầy đủ hay khả năng hoạt động liên tục. Nhóm không chịu trách nhiệm cho thiệt hại phát sinh khi bạn dùng nội dung trên website để ra quyết định tài chính.',
            ],
          },
          {
            heading: 'Thay đổi điều khoản',
            paragraphs: [
              'Điều khoản có thể được cập nhật trong quá trình thực hiện đồ án. Ngày cập nhật gần nhất được ghi ở đầu trang.',
            ],
          },
        ],
      },
      privacy: {
        title: 'Chính sách bảo mật',
        description: 'Website xử lý thông tin của bạn như thế nào.',
        intro:
          'Chính sách này áp dụng cho Monarch Securities, website demo của đồ án môn Quản lý danh mục đầu tư. Website không có chức năng đăng ký tài khoản và không thu thập thông tin cá nhân của bạn.',
        sections: [
          {
            heading: 'Website không thu thập thông tin cá nhân',
            bullets: [
              'Website không có chức năng đăng ký hay đăng nhập, nên không lưu họ tên, email hay mật khẩu của bạn.',
              'Website không thu thập số CCCD, số tài khoản ngân hàng, thông tin thẻ hay tài khoản chứng khoán.',
            ],
          },
          {
            heading: 'Cookie và dữ liệu lưu trên trình duyệt',
            paragraphs: [
              'Website không dùng cookie. Thông tin duy nhất được lưu là lựa chọn ngôn ngữ hiển thị (tiếng Việt hoặc tiếng Anh), lưu bằng bộ nhớ của trình duyệt để lần sau bạn không phải chọn lại. Dữ liệu này nằm trên máy của bạn và không được gửi về cho nhóm.',
              'Bạn có thể xóa dữ liệu này bất kỳ lúc nào trong phần cài đặt quyền riêng tư của trình duyệt (xóa dữ liệu trang web). Sau khi xóa, website hiển thị lại bằng tiếng Việt.',
            ],
          },
          {
            heading: 'Không theo dõi người dùng',
            paragraphs: [
              'Website không dùng công cụ phân tích hành vi, quảng cáo hay mạng xã hội để theo dõi bạn, và không đặt cookie theo dõi của bên thứ ba. Các biểu tượng mạng xã hội ở chân trang chỉ là liên kết thông thường.',
            ],
          },
          {
            heading: 'Dịch vụ bên thứ ba',
            bullets: [
              'Vercel: lưu trữ và phân phối website. Như mọi máy chủ web, Vercel có thể ghi nhật ký kỹ thuật như địa chỉ IP và loại trình duyệt.',
              'Google Fonts: cung cấp phông chữ, trình duyệt của bạn tải phông trực tiếp từ máy chủ của Google.',
              'DNSE (Entrade), VNDIRECT, TCBS: cung cấp giá cổ phiếu và tin tức thị trường. Các yêu cầu gửi tới những nguồn này chỉ chứa mã cổ phiếu và khoảng thời gian cần lấy, ngoài các thông tin kỹ thuật mà trình duyệt luôn gửi kèm như địa chỉ IP.',
            ],
            paragraphs: ['Mỗi dịch vụ trên có chính sách bảo mật riêng.'],
          },
          {
            heading: 'Bảo mật',
            paragraphs: [
              'Website dùng kết nối HTTPS để mã hóa dữ liệu truyền giữa trình duyệt của bạn và máy chủ.',
            ],
          },
          {
            heading: 'Thay đổi chính sách',
            paragraphs: [
              'Nếu sau này website có thêm tính năng cần thu thập thông tin, chính sách này sẽ được cập nhật trước. Ngày cập nhật gần nhất được ghi ở đầu trang.',
            ],
          },
        ],
      },
    },
  },
  en: {
    updatedLabel: 'Last updated',
    updated: 'October 17, 2026',
    docs: {
      terms: {
        title: 'Terms of Use',
        description:
          'What to know before using Monarch Securities, a demo website built for a Portfolio Management course project.',
        intro:
          'By accessing and using this website, you agree to the terms below. Please read them carefully, especially the parts about the illustrative nature of the content.',
        sections: [
          {
            heading: 'Monarch Securities is a course project',
            paragraphs: [
              'Monarch Securities is a website built by a student team for a Portfolio Management course project. It is a fictional brand: Monarch Securities is not a securities company, is not licensed by the State Securities Commission of Vietnam, and does not provide any real financial service.',
            ],
          },
          {
            heading: 'Not investment advice',
            paragraphs: [
              'The optimal complete portfolio (OCP), stock and bond weights, return and risk figures, and wealth projections on this website are calculations made for the project, based on Modern Portfolio Theory (Markowitz) and the team’s assumptions. They are not a recommendation to buy, sell or hold any security.',
              'Investing in securities always carries risk, including the loss of capital. Past results and projections do not guarantee future results. Before investing real money, do your own research and consult a licensed adviser.',
            ],
          },
          {
            heading: 'The client profile is fictional',
            paragraphs: [
              'The family of Mr. Nam and Ms. Nữ shown in the dashboard is a fictional client profile created for the project’s Investment Policy Statement (IPS) covering 2026-2036. All income, spending, assets, loans and financial goals were set by the team. Any resemblance to real people is purely coincidental.',
            ],
          },
          {
            heading: 'Market data',
            bullets: [
              'Stock prices: daily session data from the public DNSE (Entrade) API, fetched through the website’s own proxy server. If DNSE does not respond, the website switches to VNDIRECT as a backup source.',
              'Update frequency: the price chart refreshes about every 25 seconds. Because data is cached to load faster, prices shown may lag the exchange’s price board by a few minutes.',
              'News: requested from VNDIRECT and TCBS in parallel, and whichever answers first is used. Articles are copyrighted by their source sites, the website only shows the headline and summary and links to the original.',
              'When every source fails: the chart shows simulated prices and the news section shows sample stories prepared by the team. This only keeps the interface working and does not reflect the real market.',
            ],
            paragraphs: ['For these reasons, do not rely on the data on this website to trade.'],
          },
          {
            heading: 'No financial transactions',
            bullets: [
              'The website does not take money, charge fees or process payments.',
              'The website does not open brokerage accounts or place orders on your behalf.',
            ],
          },
          {
            heading: 'Third-party brands',
            paragraphs: [
              'Names and logos of companies, banks and brokerages shown on this website belong to their respective owners and are used for illustration only. Their appearance does not mean they partner with or endorse the project.',
            ],
          },
          {
            heading: 'Limitation of liability',
            paragraphs: [
              'The website is provided as is, with no warranty of accuracy, completeness or continuous availability. The team is not liable for any loss arising from using its content to make financial decisions.',
            ],
          },
          {
            heading: 'Changes to these terms',
            paragraphs: [
              'These terms may be updated while the project is in progress. The date of the latest update is shown at the top of the page.',
            ],
          },
        ],
      },
      privacy: {
        title: 'Privacy Policy',
        description: 'How the website handles your information.',
        intro:
          'This policy applies to Monarch Securities, a demo website built for a Portfolio Management course project. The website has no account registration and does not collect your personal information.',
        sections: [
          {
            heading: 'No personal information is collected',
            bullets: [
              'The website has no sign-up or sign-in, so it does not store your name, email or password.',
              'The website does not collect national ID numbers, bank account numbers, card details or brokerage accounts.',
            ],
          },
          {
            heading: 'Cookies and browser storage',
            paragraphs: [
              'The website does not use cookies. The only thing it stores is your display language (Vietnamese or English), kept in your browser’s storage so you do not have to choose again. This stays on your device and is never sent to the team.',
              'You can clear it at any time from your browser’s privacy settings (clear site data). Afterwards the website shows in Vietnamese again.',
            ],
          },
          {
            heading: 'No tracking',
            paragraphs: [
              'The website uses no behavioural analytics, advertising or social media tools to track you, and sets no third-party tracking cookies. The social icons in the footer are plain links.',
            ],
          },
          {
            heading: 'Third-party services',
            bullets: [
              'Vercel: hosting and delivering the website. Like any web server, Vercel may keep technical logs such as IP address and browser type.',
              'Google Fonts: serves the typefaces, your browser downloads them directly from Google’s servers.',
              'DNSE (Entrade), VNDIRECT, TCBS: supply stock prices and market news. Requests to these sources only carry the ticker and the date range needed, besides the technical details every browser sends, such as your IP address.',
            ],
            paragraphs: ['Each of these services has its own privacy policy.'],
          },
          {
            heading: 'Security',
            paragraphs: [
              'The website uses HTTPS to encrypt data travelling between your browser and the server.',
            ],
          },
          {
            heading: 'Changes to this policy',
            paragraphs: [
              'If the website later adds a feature that collects information, this policy will be updated first. The date of the latest update is shown at the top of the page.',
            ],
          },
        ],
      },
    },
  },
};
