export type Language = 'vi' | 'en';

export interface TranslationDictionary {
  common: {
    language: string;
    switchTo: string;
    vnd: string;
    millionVnd: string;
    vndPerMonth: string;
    loading: string;
    backToHome: string;
    getStarted: string;
    allRightsReserved: string;
    month: string;
    months: string;
    year: string;
    years: string;
  };
  landing: {
    nav: {
      getStarted: string;
      dashboard: string;
      login: string;
      signUp: string;
    };
    hero: {
      title1: string;
      title2: string;
      subtitle: string;
      cta: string;
    };
    bento: {
      price: { title: string; description: string };
      flows: { title: string; description: string };
      goals: { title: string; description: string; steps: string[] };
      structure: { title: string; description: string };
      metrics: { title: string; description: string; items: string[] };
    };
    features: {
      sectionTitle: string;
      sectionSubtitle: string;
      cards: {
        card1: {
          title: string;
          description: string;
          imageAlt: string;
          buttonText: string;
        };
        card2: {
          title: string;
          description: string;
          imageAlt: string;
          buttonText: string;
        };
        card3: {
          title: string;
          description: string;
          imageAlt: string;
        };
      };
    };
    principles: {
      title: string;
      subtitle: string;
      items: {
        title: string;
        description: string;
      }[];
    };
    process: {
      sectionTitle1: string;
      sectionTitle2: string;
      sectionSubtitle: string;
      cards: {
        step1: {
          title: string;
          description: string;
        };
        step2: {
          title: string;
          description: string;
        };
        step3: {
          title: string;
          description: string;
        };
      };
      illustrations: {
        riskGauge: {
          label: string;
          balanced: string;
          goals: {
            emergency: string;
            home: string;
            education: string;
            retirement: string;
          };
          completed: string;
        };
        frontier: {
          title: string;
          feasible: string;
          optimal: string;
          optimalTag: string;
          riskAxis: string;
          returnAxis: string;
        };
        rebalance: {
          phases: {
            p1: { step: string; note: string; chip: string };
            p2: { step: string; note: string; chip: string };
            p3: { step: string; note: string; chip: string };
          };
          stocksLabel: string;
          bondsLabel: string;
          title: string;
          status: {
            over: string;
            under: string;
            onTarget: string;
          };
          targetWeightNote: string;
        };
      };
    };
    testimonials: {
      title: string;
      subtitle: string;
      items: {
        quote: string;
        author: string;
        role: string;
      }[];
    };
    faq: {
      title: string;
      subtitle: string;
      items: {
        question: string;
        answer: string;
      }[];
    };
    footer: {
      brandDesc: string;
      servicesHeading: string;
      methodsHeading: string;
      legalHeading: string;
      serviceLinks: {
        services: string;
        process: string;
        faq: string;
      };
      methodLinks: {
        allocation: string;
        constraints: string;
        rebalance: string;
      };
      legalLinks: {
        terms: string;
        privacy: string;
      };
      copyright: string;
    };
  };
  dashboard: {
    nav: {
      analysis: string;
      monitor: string;
      workplace: string;
      homeTitle: string;
    };
    footer: {
      copyright: string;
      home: string;
      faq: string;
    };
    analysis: {
      kpi: {
        expectedReturn: string;
        expectedReturnTooltip: string;
        expectedReturnMonthly: string;
        expectedReturnVsRiskFree: string;
        risk: string;
        riskTooltip: string;
        riskMonthly: string;
        riskVsVnIndex: string;
        riskFree: string;
        riskFreeTooltip: string;
        riskFreeTenYear: string;
        sharpeRatio: string;
      };
      salesCard: {
        expensesTab: string;
        cashflowTab: string;
        thisMonth: string;
        thisQuarter: string;
        thisYear: string;
        expensesTooltip: string;
        cashflowTooltip: string;
        cashflowSummary: string;
        expenseItems: Record<string, string>;
        cashflowItems: Record<string, string>;
      };
      topSearch: {
        title: string;
        subtitle: string;
        srLegend: string;
        vsLastQuarter: string;
        orpLabel: string;
        ocpLabel: string;
        priorQuarterClose: string;
        quarterHigh: string;
        quarterLow: string;
        initialCapital: string;
        tableCaption: string;
        dateCol: string;
        stockDescriptions: Record<string, { name: string; sector: string; role: string }>;
      };
      proportion: {
        title: string;
        subtitles: {
          assets: string;
          capital: string;
          cash: string;
          portfolio: string;
        };
        totalLabels: {
          assets: string;
          capital: string;
          cash: string;
          portfolio: string;
        };
        tabs: {
          assets: string;
          capital: string;
          cash: string;
          portfolio: string;
        };
        labels: Record<string, string>;
      };
    };
    monitor: {
      chart: {
        timeframes: {
          '1M': string;
          '3M': string;
          '6M': string;
          '1Y': string;
          ALL: string;
        };
        ma20Tooltip: string;
        volumeTooltip: string;
        refreshTooltip: string;
        collapseTooltip: string;
        expandTooltip: string;
        fullscreenTooltip: string;
        exitFullscreenTooltip: string;
      };
      news: {
        title: string;
        broadMarket: string;
        searchPlaceholder: string;
        refreshTooltip: string;
        emptyText: string;
        justNow: string;
        minutesAgo: string;
        hoursAgo: string;
        yesterday: string;
        daysAgo: string;
      };
    };
    workplace: {
      header: {
        title: string;
        subtitle: string;
      };
      profiles: {
        husband: {
          tag: string;
          role: string;
          org: string;
          income: string;
          benefit: string;
        };
        wife: {
          tag: string;
          role: string;
          org: string;
          income: string;
          benefit: string;
        };
        child1: {
          tag: string;
          role: string;
          org: string;
        };
        child2: {
          tag: string;
          role: string;
          org: string;
        };
      };
      benchmark: {
        title: string;
        metricCol: string;
        metrics: {
          expectedReturn: string;
          risk: string;
          sharpe: string;
          utility: string;
        };
      };
      radar: {
        title: string;
        subjects: {
          return: string;
          risk: string;
          growth: string;
          sharpe: string;
          utility: string;
        };
        legends: {
          ocp: string;
          market: string;
          bonds: string;
        };
        values: {
          growthOcp: string;
          growthMarket: string;
          growthBonds: string;
        };
      };
      roadmap: {
        title: string;
        subtitle: string;
        bannerTitle: string;
        bannerDesc: string;
        tags: {
          car: string;
          loanRecovery: string;
          house: string;
        };
        labels: {
          need: string;
          fund: string;
        };
        states: {
          done: string;
          current: string;
          skipped: string;
          todo: string;
        };
        progressSummary: {
          doneFormat: (done: number, total: number) => string;
          skippedFormat: (skipped: number) => string;
        };
        steps: {
          car: {
            title: string;
            duration: string;
            badge: string;
            description: string;
            needLabel: string;
            needAdjusted: string;
            needOriginal: string;
            fundLabel: string;
            fundValue: string;
            fundPercent: string;
            recommendationTitle: string;
            recommendationText: string;
          };
          loanRecovery: {
            title: string;
            duration: string;
            badge: string;
            description: string;
            recoveredLabel: string;
            recoveredValue: string;
            detailsText: string;
          };
          house: {
            title: string;
            duration: string;
            badge: string;
            description: string;
            needLabel: string;
            needAdjusted: string;
            needOriginal: string;
            fundLabel: string;
            fundValue: string;
            fundPercent: string;
            outcomeTitle: string;
            outcomeTextPrefix: string;
            outcomeSurplus: string;
            outcomeTextSuffix: string;
          };
        };
      };
    };
    profile: {
      title: string;
      subtitle: string;
      fullNameLabel: string;
      fullNamePlaceholder: string;
      emailLabel: string;
      changePhoto: string;
      removePhoto: string;
      saveChanges: string;
      saving: string;
    };
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  vi: {
    common: {
      language: 'Tiếng Việt',
      switchTo: 'English',
      vnd: '₫',
      millionVnd: 'triệu ₫',
      vndPerMonth: '₫/tháng',
      loading: 'Đang tải...',
      backToHome: 'Về trang chủ',
      getStarted: 'Bắt Đầu Ngay',
      allRightsReserved: 'Bảo lưu mọi quyền.',
      month: '1 tháng',
      months: 'tháng',
      year: 'năm',
      years: 'năm',
    },
    landing: {
      nav: {
        getStarted: 'Bắt Đầu Ngay',
        dashboard: 'Bảng điều khiển',
        login: 'Đăng nhập',
        signUp: 'Đăng ký',
      },
      hero: {
        title1: 'Tối Ưu Danh Mục',
        title2: 'Đầu Tư Chuẩn Khoa Học',
        subtitle:
          'Phân bổ tài sản theo Lý thuyết danh mục hiện đại, tái cân bằng định kỳ và bảo vệ tài sản gia đình bạn qua mọi chu kỳ thị trường',
        cta: 'Bắt Đầu Ngay',
      },
      bento: {
        price: {
          title: 'Theo dõi danh mục đầu tư',
          description: 'Giá từng mã theo khung thời gian, MA20 và khối lượng.',
        },
        flows: {
          title: 'Chi tiêu và dòng tiền',
          description: 'Chi tiêu và dòng tiền gia đình theo tháng, quý và năm.',
        },
        goals: {
          title: 'Mục tiêu tài chính',
          description: 'Đánh giá tính khả thi của từng mục tiêu và theo dõi lộ trình thực hiện.',
          steps: ['Mua xe hơi', 'Thu hồi nợ', 'Mua nhà'],
        },
        structure: {
          title: 'Cơ cấu tài sản',
          description: 'Tài sản, nguồn vốn, tiền mặt và danh mục đầu tư.',
        },
        metrics: {
          title: 'Chỉ số hiệu quả',
          description: 'Lợi suất kỳ vọng, rủi ro, lãi suất phi rủi ro và Sharpe.',
          items: ['Lợi suất kỳ vọng', 'Chỉ số Sharpe'],
        },
      },
      features: {
        sectionTitle: 'Mỗi nhà đầu tư có mục tiêu và ngưỡng an toàn tài chính riêng',
        sectionSubtitle:
          'Thay vì lời khuyên chung chung, chúng tôi xây dựng lộ trình đầu tư khoa học dành riêng cho bạn',
        cards: {
          card1: {
            title: 'Phân Bổ Vốn Theo Đúng Mục Tiêu Của Bạn',
            description:
              'Dựa trên mức rủi ro bạn chấp nhận, khả năng tiết kiệm và kế hoạch nghỉ hưu, chúng tôi phân bổ vốn hợp lý vào cổ phiếu, ETF, trái phiếu và tài sản an toàn.',
            imageAlt: 'Thiết kế danh mục đầu tư cá nhân',
            buttonText: 'Tìm hiểu phương pháp',
          },
          card2: {
            title: 'Lợi Nhuận Tối Ưu, Rủi Ro Trong Tầm Kiểm Soát',
            description:
              'Chúng tôi đa dạng hóa danh mục theo Lý thuyết danh mục hiện đại của Harry Markowitz và chỉ mua khi giá có đủ biên an toàn theo nguyên tắc của Benjamin Graham, để danh mục đạt lợi nhuận tốt nhất trong mức rủi ro bạn chấp nhận.',
            imageAlt: 'Tối ưu hóa danh mục MPT',
            buttonText: 'Khám phá chiến lược',
          },
          card3: {
            title: 'Đội Ngũ Chuyên Viên Đồng Hành, Tái Cân Bằng Định Kỳ',
            description:
              'Chuyên viên cố vấn trực tiếp theo dõi danh mục và điều chỉnh tỷ trọng tài sản định kỳ trước biến động vĩ mô, giúp bảo toàn thành quả đầu tư dài hạn.',
            imageAlt: 'Chuyên viên cố vấn đồng hành riêng',
          },
        },
      },
      principles: {
        title: 'Đầu Tư Trong Đúng Giới Hạn Của Gia Đình',
        subtitle:
          'Trước khi tính đến lợi nhuận, chúng tôi xác định rõ các ràng buộc trong Tuyên bố Chính sách Đầu tư để danh mục phù hợp với hoàn cảnh thực tế của gia đình bạn.',
        items: [
          {
            title: 'Thanh khoản',
            description:
              'Duy trì quỹ dự phòng và tài sản dễ chuyển thành tiền mặt để đáp ứng chi tiêu bất ngờ mà không phải bán tháo danh mục.',
          },
          {
            title: 'Thời gian đầu tư',
            description:
              'Mỗi mục tiêu có kỳ hạn riêng: mục tiêu gần ưu tiên an toàn, mục tiêu xa tận dụng lãi kép.',
          },
          {
            title: 'Thuế',
            description:
              'Tính đến thuế đối với cổ tức, lãi tiền gửi và giao dịch chứng khoán để tối ưu lợi nhuận thực nhận.',
          },
          {
            title: 'Pháp lý',
            description:
              'Chỉ chọn tài sản minh bạch, giao dịch qua tổ chức được cấp phép và tuân thủ quy định hiện hành.',
          },
          {
            title: 'Hoàn cảnh riêng',
            description:
              'Cân nhắc người phụ thuộc, tài sản hiện có, các khoản nợ và ưu tiên riêng của từng gia đình.',
          },
        ],
      },
      process: {
        sectionTitle1: 'Quy Trình Hoạch Định Danh Mục',
        sectionTitle2: 'Bài Bản & Tinh Gọn',
        sectionSubtitle:
          'Không còn lo lắng trước biến động thị trường hay mua bán theo cảm tính. Chúng tôi giúp bạn tích lũy có kỷ luật, để tài sản tăng trưởng bền vững trong ngưỡng an toàn của gia đình.',
        cards: {
          step1: {
            title: 'Hiểu Rõ Mục Tiêu & Ngưỡng An Toàn Của Gia Đình',
            description:
              'Đánh giá mức chấp nhận rủi ro bằng bảng khảo sát chuẩn quốc tế, cân đối lại thu chi và lập quỹ dự phòng, tạo nền tảng cho các mục tiêu mua nhà, học vấn của con và hưu trí.',
          },
          step2: {
            title: 'Thiết Kế & Tối Ưu Hóa Danh Mục Đầu Tư',
            description:
              'Kết hợp cổ phiếu đầu ngành có nền tảng vững chắc với trái phiếu Chính phủ theo mô hình tối ưu Markowitz, để đạt lợi nhuận kỳ vọng cao nhất ở mức biến động phù hợp.',
          },
          step3: {
            title: 'Theo Dõi Tỷ Trọng & Tái Cân Bằng Định Kỳ',
            description:
              'Không chạy theo tâm lý đám đông. Chúng tôi rà soát danh mục định kỳ để giữ đúng tỷ trọng mục tiêu giữa cổ phiếu và trái phiếu, ưu tiên dùng tiền tiết kiệm hằng tháng để tái cân bằng nhằm tiết giảm chi phí giao dịch.',
          },
        },
        illustrations: {
          riskGauge: {
            label: 'Ngưỡng chấp nhận rủi ro',
            balanced: 'Cân bằng',
            goals: {
              emergency: 'Quỹ dự phòng',
              home: 'Mua nhà',
              education: 'Học phí cho con',
              retirement: 'Hưu trí',
            },
            completed: 'Hoàn thành',
          },
          frontier: {
            title: 'Đường biên hiệu quả',
            feasible: 'Danh mục khả thi',
            optimal: 'Tối ưu',
            optimalTag: 'Danh mục tối ưu',
            riskAxis: 'Rủi ro →',
            returnAxis: '↑ Lợi nhuận kỳ vọng',
          },
          rebalance: {
            phases: {
              p1: { step: 'Khởi tạo', note: 'Tỷ trọng mục tiêu', chip: 'Đúng mục tiêu' },
              p2: { step: 'Sau một chu kỳ', note: 'Thị trường tăng, cổ phiếu chiếm quá nhiều', chip: 'Lệch khỏi mục tiêu' },
              p3: { step: 'Tái cân bằng', note: 'Chốt bớt cổ phiếu, bổ sung trái phiếu', chip: 'Đã cân bằng' },
            },
            stocksLabel: 'Cổ phiếu',
            bondsLabel: 'Trái phiếu Chính phủ',
            title: 'Tỷ trọng danh mục',
            status: {
              over: 'Vượt mục tiêu',
              under: 'Dưới mục tiêu',
              onTarget: 'Đúng mục tiêu',
            },
            targetWeightNote: 'Vạch đen là tỷ trọng mục tiêu. Danh mục được rà soát định kỳ.',
          },
        },
      },
      testimonials: {
        title: 'Những Tư Tưởng Dẫn Lối',
        subtitle:
          'Những nguyên tắc định hướng cách chúng tôi phân bổ danh mục, quản trị rủi ro và gia tăng tài sản bền vững.',
        items: [
          {
            quote:
              'Quy tắc thứ nhất: Không bao giờ để mất tiền. Quy tắc thứ hai: Không bao giờ quên quy tắc thứ nhất. Hãy sợ hãi khi người khác tham lam, và hãy tham lam khi người khác sợ hãi.',
            author: 'Warren Buffett',
            role: 'Nhà đầu tư huyền thoại, Chủ tịch kiêm CEO Berkshire Hathaway',
          },
          {
            quote:
              'Hãy đảo ngược, luôn đảo ngược: nhìn vấn đề từ chiều ngược lại. Thật đáng ngạc nhiên khi những người như chúng tôi có được nhiều lợi thế dài hạn chỉ nhờ luôn cố gắng không làm điều ngớ ngẩn, thay vì cố tỏ ra thật thông minh.',
            author: 'Charlie Munger',
            role: 'Cố Phó Chủ tịch Berkshire Hathaway',
          },
          {
            quote:
              'Đa dạng hóa là bữa trưa miễn phí duy nhất trong tài chính. Một danh mục tốt không chỉ là danh sách dài những cổ phiếu và trái phiếu tốt, mà là một tổng thể cân bằng, vừa bảo vệ vừa mở ra cơ hội trước nhiều tình huống bất ngờ.',
            author: 'Harry Markowitz',
            role: 'Nhà kinh tế đoạt giải Nobel, cha đẻ Lý thuyết danh mục hiện đại',
          },
          {
            quote:
              'Trong ngắn hạn, thị trường là một cỗ máy bỏ phiếu; về dài hạn, nó là một chiếc cân. Nếu phải gói gọn bí quyết đầu tư đúng đắn trong ba từ, chúng tôi chọn: Biên an toàn.',
            author: 'Benjamin Graham',
            role: 'Cha đẻ trường phái đầu tư giá trị, tác giả cuốn Nhà đầu tư thông minh',
          },
          {
            quote:
              'Thị trường có thể phi lý lâu hơn khả năng chi trả của bạn. Cái khó không nằm ở việc nảy ra ý tưởng mới, mà ở việc thoát khỏi lối nghĩ cũ.',
            author: 'John Maynard Keynes',
            role: 'Người đặt nền móng cho kinh tế học vĩ mô hiện đại',
          },
          {
            quote:
              'Chúng ta có bữa tối không phải nhờ lòng tốt của người bán thịt, người nấu bia hay người làm bánh, mà nhờ họ quan tâm đến lợi ích của chính mình. Khi theo đuổi lợi ích riêng, mỗi người thường đóng góp cho xã hội hiệu quả hơn cả khi họ chủ ý làm điều đó.',
            author: 'Adam Smith',
            role: 'Cha đẻ kinh tế học hiện đại, tác giả cuốn Của cải của các quốc gia',
          },
        ],
      },
      faq: {
        title: 'Câu Hỏi Thường Gặp',
        subtitle:
          'Những điều bạn cần biết về nguyên tắc tư vấn độc lập, sự an toàn của tài sản và cách chúng tôi làm việc cùng bạn.',
        items: [
          {
            question: 'Dịch vụ tư vấn danh mục đầu tư hoạt động như thế nào?',
            answer:
              'Chúng tôi là đơn vị tư vấn tài chính độc lập, luôn đặt lợi ích của khách hàng lên hàng đầu. Chúng tôi phân tích thu nhập, chi tiêu, các khoản nợ và mức chấp nhận rủi ro của bạn để thiết kế danh mục riêng gồm cổ phiếu, quỹ mở, trái phiếu, vàng và bất động sản. Bạn sở hữu và giao dịch trên tài khoản của chính mình, còn chúng tôi tư vấn và tái cân bằng danh mục định kỳ.',
          },
          {
            question: 'Monarch Securities có trực tiếp giữ tiền hoặc tài sản của tôi không?',
            answer:
              'Không. Tiền và toàn bộ tài sản luôn nằm trong tài khoản chứng khoán, ngân hàng hoặc công ty quản lý quỹ do chính bạn đứng tên, tại các tổ chức được Nhà nước cấp phép. Chúng tôi chỉ đưa ra khuyến nghị phân bổ, mọi quyết định với tài sản vẫn do bạn nắm giữ.',
          },
          {
            question: 'Chiến lược phân bổ danh mục dựa trên phương pháp nào?',
            answer:
              'Chúng tôi áp dụng Lý thuyết danh mục hiện đại của Harry Markowitz, nhà kinh tế đoạt giải Nobel, kết hợp với triết lý đầu tư giá trị và nguyên tắc biên an toàn của Benjamin Graham và Warren Buffett: đa dạng hóa để giảm thiểu rủi ro phi hệ thống và tập trung vào những tài sản tạo ra dòng tiền thực.',
          },
          {
            question: 'Tôi cần bao nhiêu vốn để bắt đầu?',
            answer:
              'Chúng tôi có nhiều gói tư vấn linh hoạt, từ người trẻ mới bắt đầu tích lũy với số vốn khiêm tốn đến những gia đình có tài sản lớn cần hoạch định danh mục nhiều lớp và kế thừa tài sản.',
          },
        ],
      },
      footer: {
        brandDesc:
          'Monarch Securities cung cấp dịch vụ hoạch định tài chính và quản lý danh mục đầu tư độc lập, minh bạch, đồng hành lâu dài cùng gia đình bạn.',
        servicesHeading: 'Dịch vụ',
        methodsHeading: 'Phương pháp',
        legalHeading: 'Pháp lý',
        serviceLinks: {
          services: 'Dịch vụ tư vấn',
          process: 'Quy trình hoạch định',
          faq: 'Câu hỏi thường gặp',
        },
        methodLinks: {
          allocation: 'Công cụ theo dõi danh mục',
          constraints: 'Ràng buộc đầu tư',
          rebalance: 'Tái cân bằng danh mục',
        },
        legalLinks: {
          terms: 'Điều khoản dịch vụ',
          privacy: 'Chính sách bảo mật',
        },
        copyright: 'Monarch Securities. Tư vấn danh mục đầu tư cá nhân độc lập. Bảo lưu mọi quyền.',
      },
    },
    dashboard: {
      nav: {
        analysis: 'Phân tích',
        monitor: 'Giám sát',
        workplace: 'Hồ sơ khách hàng',
        homeTitle: 'Về trang chủ',
      },
      footer: {
        copyright: 'Monarch Securities',
        home: 'Trang chủ',
        faq: 'Câu hỏi thường gặp',
      },
      analysis: {
        kpi: {
          expectedReturn: 'Tỷ suất sinh lợi kỳ vọng',
          expectedReturnTooltip: 'E(rc) của danh mục hoàn chỉnh OCP, tính theo năm',
          expectedReturnMonthly: 'Theo tháng',
          expectedReturnVsRiskFree: 'vs lãi suất phi rủi ro',
          risk: 'Rủi ro danh mục',
          riskTooltip: 'Độ lệch chuẩn σc của danh mục hoàn chỉnh, tính theo năm',
          riskMonthly: 'Theo tháng',
          riskVsVnIndex: 'thấp hơn VN-Index',
          riskFree: 'Lãi suất phi rủi ro',
          riskFreeTooltip: 'rf – Lãi suất Trái phiếu Chính phủ kỳ hạn 10 năm',
          riskFreeTenYear: 'TPCP kỳ hạn 10 năm',
          sharpeRatio: 'Chỉ số Sharpe OCP',
        },
        salesCard: {
          expensesTab: 'Phân bổ chi tiêu',
          cashflowTab: 'Dòng tiền',
          thisMonth: 'Tháng này',
          thisQuarter: 'Quý này',
          thisYear: 'Năm nay',
          expensesTooltip: 'Chi tiêu',
          cashflowTooltip: 'Số tiền',
          cashflowSummary: 'Tổng hợp dòng tiền',
          expenseItems: {
            'Giáo dục con cái': 'Giáo dục con cái',
            'Thuê nhà': 'Thuê nhà',
            'Sinh hoạt gia đình': 'Sinh hoạt gia đình',
            'Trả nợ ngân hàng': 'Trả nợ ngân hàng',
            'Giải trí & du lịch': 'Giải trí & du lịch',
            'Hỗ trợ gia đình': 'Hỗ trợ gia đình',
          },
          cashflowItems: {
            'Thu nhập anh Nam': 'Thu nhập anh Nam',
            'Thu nhập chị Nữ': 'Thu nhập chị Nữ',
            'Tổng chi tiêu': 'Tổng chi tiêu',
            'Thặng dư': 'Thặng dư',
          },
        },
        topSearch: {
          title: 'Giá cổ phiếu trong danh mục',
          subtitle: 'Theo dõi biến động so với quý trước',
          srLegend: 'Danh sách cổ phiếu trong danh mục',
          vsLastQuarter: 'vs quý trước',
          orpLabel: 'ORP (Tối ưu rủi ro)',
          ocpLabel: 'OCP (Tối ưu vốn)',
          priorQuarterClose: 'Chốt quý trước',
          quarterHigh: 'Cao nhất quý',
          quarterLow: 'Thấp nhất quý',
          initialCapital: 'Vốn đầu tư ban đầu',
          tableCaption: 'Biến động giá',
          dateCol: 'Ngày',
          stockDescriptions: {
            BID: {
              name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
              sector: 'Ngân hàng',
              role: 'Cổ phiếu trụ cột cung cấp lợi nhuận cao và ổn định',
            },
            HAH: {
              name: 'Công ty CP Vận tải và Xếp dỡ Hải An',
              sector: 'Vận tải biển – Logistics',
              role: 'Cổ phiếu tăng trưởng mang lại tỷ suất sinh lời vượt trội',
            },
            SSI: {
              name: 'Công ty CP Chứng khoán SSI',
              sector: 'Chứng khoán',
              role: 'Hưởng lợi từ thanh khoản thị trường và nâng hạng FTSE',
            },
            MSN: {
              name: 'Công ty CP Tập đoàn Masan',
              sector: 'Tiêu dùng – Bán lẻ',
              role: 'Động lực dài hạn từ mảng bán lẻ tiêu dùng thiết yếu',
            },
          },
        },
        proportion: {
          title: 'Cơ cấu tài sản',
          subtitles: {
            assets: 'Phân bổ theo danh mục tài sản sở hữu',
            capital: 'Cơ cấu giữa giá trị tài sản ròng và nợ vay ngân hàng',
            cash: 'Mục đích phân bổ lượng tiền mặt thanh khoản hiện có',
            portfolio: 'Cơ cấu phân bổ danh mục đầu tư tài chính tối ưu OCP',
          },
          totalLabels: {
            assets: 'Tổng tài sản',
            capital: 'Nguồn hình thành',
            cash: 'Tiền mặt hiện có',
            portfolio: 'Vốn đầu tư',
          },
          tabs: {
            assets: 'Tài sản',
            capital: 'Nguồn vốn',
            cash: 'Tiền mặt',
            portfolio: 'Danh mục',
          },
          labels: {
            'Đất nền Bảo Lộc': 'Đất nền Bảo Lộc',
            'Tiền mặt': 'Tiền mặt',
            'Cho bạn bè mượn': 'Cho bạn bè mượn',
            'Giá trị tài sản ròng': 'Giá trị tài sản ròng',
            'Nợ vay ngân hàng': 'Nợ vay ngân hàng',
            'Quỹ dự phòng': 'Quỹ dự phòng',
            'Vốn đầu tư ban đầu': 'Vốn đầu tư ban đầu',
            'TPCP 10 năm': 'TPCP 10 năm',
            BID: 'BID',
            HAH: 'HAH',
            SSI: 'SSI',
            MSN: 'MSN',
          },
        },
      },
      monitor: {
        chart: {
          timeframes: {
            '1M': '1T',
            '3M': '3T',
            '6M': '6T',
            '1Y': '1N',
            ALL: 'Tất cả',
          },
          ma20Tooltip: 'Đường trung bình MA20',
          volumeTooltip: 'Khối lượng Vol',
          refreshTooltip: 'Cập nhật giá mới nhất',
          collapseTooltip: 'Thu gọn (480px)',
          expandTooltip: 'Mở rộng (800px)',
          fullscreenTooltip: 'Toàn màn hình',
          exitFullscreenTooltip: 'Thoát toàn màn hình',
        },
        news: {
          title: 'Cập nhật tin tức thị trường',
          broadMarket: 'Thị trường chung',
          searchPlaceholder: 'Tìm tin tức...',
          refreshTooltip: 'Làm mới tin tức',
          emptyText: 'Không tìm thấy bản tin phù hợp',
          justNow: 'Vừa xong',
          minutesAgo: 'phút trước',
          hoursAgo: 'giờ trước',
          yesterday: 'Hôm qua',
          daysAgo: 'ngày trước',
        },
      },
      workplace: {
        header: {
          title: 'Thành viên gia đình',
          subtitle: 'Gia đình 4 thành viên · Thuê nhà tại đường Lương Đình Của, Quận 2',
        },
        profiles: {
          husband: {
            tag: 'Chủ hộ',
            role: 'Trưởng phòng Kế toán',
            org: 'Phòng giao dịch ngân hàng',
            income: 'Thu nhập: 45.000.000 ₫/tháng',
            benefit: 'Có BHXH, BHYT đầy đủ',
          },
          wife: {
            tag: 'Vợ',
            role: 'Nhân viên Kế toán',
            org: 'Cùng phòng giao dịch ngân hàng',
            income: 'Thu nhập: 20.000.000 ₫/tháng',
            benefit: 'Có BHXH, BHYT đầy đủ',
          },
          child1: {
            tag: 'Con cả',
            role: 'Học sinh Cấp 2',
            org: 'Trường cấp 2 Tuệ Đức, Quận 2',
          },
          child2: {
            tag: 'Con út',
            role: 'Học sinh Mầm non',
            org: 'Trường mẫu giáo Vườn Hồng, Quận 2',
          },
        },
        benchmark: {
          title: 'Số liệu chi tiết',
          metricCol: 'Chỉ tiêu',
          metrics: {
            expectedReturn: 'Lợi suất kỳ vọng',
            risk: 'Độ lệch chuẩn rủi ro σ',
            sharpe: 'Chỉ số Sharpe',
            utility: 'Độ thỏa dụng U',
          },
        },
        radar: {
          title: 'Hiệu quả đầu tư',
          subjects: {
            return: 'Sinh lời',
            risk: 'Rủi ro',
            growth: 'Tăng trưởng',
            sharpe: 'Sharpe',
            utility: 'Thỏa dụng',
          },
          legends: {
            ocp: 'Danh mục OCP',
            market: 'Thị trường VN-Index',
            bonds: 'Trái phiếu CP',
          },
          values: {
            growthOcp: 'Tối ưu 10 năm',
            growthMarket: 'Theo chu kỳ',
            growthBonds: 'Tuyến tính',
          },
        },
        roadmap: {
          title: 'Mục tiêu tài chính',
          subtitle: 'Tính theo lạm phát giả định 4,5%/năm',
          tags: { car: 'Nên hoãn', loanRecovery: 'Tái đầu tư', house: 'Khả thi' },
          labels: { need: 'Nhu cầu', fund: 'Quỹ dự kiến' },
          bannerTitle: 'Cơ chế quỹ tích lũy liên tục:',
          bannerDesc:
            'Toàn bộ kế hoạch vận hành trên cùng một quỹ đầu tư tăng trưởng liên tục. Quyết định không rút vốn ở các mốc ngắn hạn giúp bảo toàn trọn vẹn sức mạnh lãi kép để hiện thực hóa mục tiêu an cư lớn nhất.',
          states: {
            done: 'Khả thi · Thực thi',
            current: 'Mục tiêu trọng tâm',
            skipped: 'Chưa khả thi · Tạm hoãn',
            todo: 'Dự kiến tương lai',
          },
          progressSummary: {
            doneFormat: (done, total) => `Hoàn tất ${done} trên ${total} cột mốc kế hoạch`,
            skippedFormat: (skipped) => ` · ${skipped} mốc tạm hoãn để bảo toàn vốn`,
          },
          steps: {
            car: {
              title: 'Mua ô tô cho gia đình',
              duration: 'Sau 3 năm',
              badge: 'Chưa khả thi · Khuyến nghị tạm hoãn',
              description: 'Để tiện đưa đón con đi học và sinh hoạt cuối tuần.',
              needLabel: 'Nhu cầu vốn điều chỉnh lạm phát',
              needAdjusted: '912,93 triệu ₫',
              needOriginal: 'gốc 800 triệu ₫',
              fundLabel: 'Giá trị quỹ dự phóng tại năm thứ 3',
              fundValue: '723,80 triệu ₫',
              fundPercent: 'Đáp ứng 79,3%, còn thiếu 189,13 triệu ₫',
              recommendationTitle: 'Khuyến nghị chiến lược:',
              recommendationText:
                'Giữ nguyên 723,80 triệu ₫ trong quỹ để tiếp tục sinh lãi kép cho mục tiêu mua nhà.',
            },
            loanRecovery: {
              title: 'Thu hồi khoản cho vay cá nhân',
              duration: 'Sau 5 năm',
              badge: 'Dòng tiền vào · Bổ sung tái đầu tư',
              description:
                'Thu hồi đủ tiền gốc đúng hạn vào tháng thứ 60 và đưa toàn bộ vào quỹ đầu tư.',
              recoveredLabel: 'bổ sung vào quỹ OCP',
              recoveredValue: '+100,00 triệu ₫',
              detailsText:
                'Toàn bộ 100 triệu ₫ được nạp trực tiếp vào quỹ đầu tư OCP, gia tăng quy mô tài sản sinh lời ngay trước giai đoạn tăng tốc 5 năm cuối.',
            },
            house: {
              title: 'Mua nhà tại Quận 2 hoặc Quận 9 cũ',
              duration: 'Sau 10 năm',
              badge: 'Khả thi vượt trội · Vượt 153% nhu cầu',
              description: 'Mục tiêu an cư dài hạn gần chỗ làm của hai vợ chồng và trường học của hai con.',
              needLabel: 'Nhu cầu vốn điều chỉnh lạm phát',
              needAdjusted: '5.357,74 triệu ₫',
              needOriginal: 'gốc 3.450 triệu ₫',
              fundLabel: 'Giá trị quỹ dự phóng tại năm thứ 10',
              fundValue: '8.199,80 triệu ₫',
              fundPercent: 'Đáp ứng 153,0% nhu cầu',
              outcomeTitle: 'Kết quả hoạch định:',
              outcomeTextPrefix: 'Vượt mục tiêu, còn dư',
              outcomeSurplus: '+2.842,10 triệu ₫',
              outcomeTextSuffix:
                '. Gia đình mua được nhà mà không cần vay, vẫn giữ lại một khoản dự phòng cho tương lai.',
            },
          },
        },
      },
      profile: {
        title: 'Hồ sơ của tôi',
        subtitle: 'Quản lý thông tin cá nhân và thiết lập tài khoản',
        fullNameLabel: 'Họ và tên',
        fullNamePlaceholder: 'Nhập họ và tên',
        emailLabel: 'Địa chỉ Email',
        changePhoto: 'Thay ảnh đại diện',
        removePhoto: 'Xóa ảnh',
        saveChanges: 'Lưu thay đổi',
        saving: 'Đang lưu...',
      },
    },
  },
  en: {
    common: {
      language: 'English',
      switchTo: 'Tiếng Việt',
      vnd: 'VND',
      millionVnd: 'M VND',
      vndPerMonth: 'VND/mo',
      loading: 'Loading...',
      backToHome: 'Back to Home',
      getStarted: 'Get Started',
      allRightsReserved: 'All rights reserved.',
      month: '1 month',
      months: 'months',
      year: 'year',
      years: 'years',
    },
    landing: {
      nav: {
        getStarted: 'Get Started',
        dashboard: 'Dashboard',
        login: 'Sign in',
        signUp: 'Sign up',
      },
      hero: {
        title1: 'Scientifically Optimized',
        title2: 'Investment Portfolios',
        subtitle:
          'Asset allocation grounded in Modern Portfolio Theory, periodic disciplined rebalancing, and long-term wealth preservation for your family across every market cycle.',
        cta: 'Get Started',
      },
      bento: {
        price: {
          title: 'Portfolio Tracking',
          description: 'Each holding by timeframe, with MA20 and volume.',
        },
        flows: {
          title: 'Spending & Cash Flow',
          description: 'Family spending and cash flow by month, quarter, and year.',
        },
        goals: {
          title: 'Financial Goals',
          description: 'Assess the feasibility of each goal and track the roadmap toward it.',
          steps: ['Buy a car', 'Recover a loan', 'Buy a home'],
        },
        structure: {
          title: 'Asset Structure',
          description: 'Assets, funding sources, cash, and the portfolio.',
        },
        metrics: {
          title: 'Performance Metrics',
          description: 'Expected return, risk, risk-free rate, and Sharpe.',
          items: ['Expected return', 'Sharpe ratio'],
        },
      },
      features: {
        sectionTitle: 'Every Investor Has Unique Goals & Financial Safety Margins',
        sectionSubtitle:
          'Instead of generic rules of thumb, we build a scientific, disciplined wealth roadmap tailored exclusively for your family.',
        cards: {
          card1: {
            title: 'Goal-Driven, Personalized Allocation',
            description:
              'Based on your risk tolerance, savings rate, and retirement timeline, we allocate capital prudently across individual equities, ETFs, bonds, and defensive reserves.',
            imageAlt: 'Personalized portfolio design',
            buttonText: 'Explore Methodology',
          },
          card2: {
            title: 'Optimized Return, Controlled Risk',
            description:
              'We diversify to eliminate unsystematic risk using Harry Markowitz’s Modern Portfolio Theory, combined with Benjamin Graham’s margin-of-safety principles to ensure maximum risk-adjusted returns.',
            imageAlt: 'MPT portfolio optimization',
            buttonText: 'Discover Strategy',
          },
          card3: {
            title: 'Dedicated Advisory & Disciplined Rebalancing',
            description:
              'Senior fiduciary wealth advisors actively oversee your assets, performing periodic rebalancing across macroeconomic cycles to lock in hard-earned gains.',
            imageAlt: 'Dedicated wealth advisory',
          },
        },
      },
      principles: {
        title: 'The Constraints That Shape Every Portfolio',
        subtitle:
          'Before optimizing returns, we set clear boundaries in the Investment Policy Statement so the portfolio always fits your family’s real circumstances.',
        items: [
          {
            title: 'Liquidity',
            description:
              'Keep an emergency reserve and highly liquid assets to meet unexpected spending needs without forced selling.',
          },
          {
            title: 'Time Horizon',
            description:
              'Layer horizons by goal: near-term goals favor safety, long-term goals put the power of compounding to work.',
          },
          {
            title: 'Taxes',
            description:
              'Account for taxes on dividends, deposit interest, and securities trading to optimize the returns you actually keep.',
          },
          {
            title: 'Legal & Regulatory',
            description:
              'Select only transparent assets, transact through licensed institutions, and comply with prevailing regulations.',
          },
          {
            title: 'Unique Circumstances',
            description:
              'Factor in dependents, existing assets, debt obligations, and the particular priorities of each family.',
          },
        ],
      },
      process: {
        sectionTitle1: 'A Disciplined & Streamlined',
        sectionTitle2: 'Portfolio Planning Process',
        sectionSubtitle:
          'Free yourself from market noise and emotional trading decisions. We help you build wealth with discipline, so it grows steadily while staying within your family’s safety threshold.',
        cards: {
          step1: {
            title: 'Understand Risk Tolerance & Family Milestones',
            description:
              'Assess risk tolerance through standardized psychometric profiling, streamline monthly cash flows, and build emergency reserves to secure homeownership, education, and retirement.',
          },
          step2: {
            title: 'Design & Mathematically Optimize Portfolios',
            description:
              'Synthesize top-tier defensive equities with risk-free government bonds via Markowitz quadratic optimization to deliver maximum expected return for target volatility.',
          },
          step3: {
            title: 'Continuous Tracking & Disciplined Rebalancing',
            description:
              'Never follow emotional crowd trends. We audit allocations periodically to maintain target equity/bond ratios, deploying recurring monthly savings to rebalance with minimal transaction fees.',
          },
        },
        illustrations: {
          riskGauge: {
            label: 'Risk Tolerance',
            balanced: 'Balanced',
            goals: {
              emergency: 'Emergency Fund',
              home: 'Home Purchase',
              education: 'Children’s Tuition',
              retirement: 'Retirement',
            },
            completed: 'Achieved',
          },
          frontier: {
            title: 'Efficient Frontier',
            feasible: 'Feasible Portfolios',
            optimal: 'Optimal',
            optimalTag: 'Optimal Portfolio',
            riskAxis: 'Risk →',
            returnAxis: '↑ Expected Return',
          },
          rebalance: {
            phases: {
              p1: { step: 'Inception', note: 'Target allocation', chip: 'On Target' },
              p2: { step: 'One Cycle Later', note: 'Market rallies; equities overweight', chip: 'Off Target' },
              p3: { step: 'Rebalance', note: 'Trim equities; reallocate to bonds', chip: 'Rebalanced' },
            },
            stocksLabel: 'Equities',
            bondsLabel: 'Government Bonds',
            title: 'Portfolio Weights',
            status: {
              over: 'Overweight',
              under: 'Underweight',
              onTarget: 'On target',
            },
            targetWeightNote: 'Black indicator denotes target weight. Allocations are reviewed periodically.',
          },
        },
      },
      testimonials: {
        title: 'The Ideas That Guide Us',
        subtitle:
          'The guiding principles behind our scientific asset allocation methodology, risk management, and sustainable wealth growth.',
        items: [
          {
            quote:
              'Rule number one: Never lose money. Rule number two: Never forget rule number one. Be fearful when others are greedy, and greedy when others are fearful.',
            author: 'Warren Buffett',
            role: 'Chairman & CEO, Berkshire Hathaway',
          },
          {
            quote:
              'Invert, always invert: Turn a situation or problem upside down. It is remarkable how much long-term advantage people like us have gotten by trying to be consistently not stupid, instead of trying to be very intelligent.',
            author: 'Charlie Munger',
            role: 'Vice Chairman, Berkshire Hathaway',
          },
          {
            quote:
              'Diversification is the only free lunch in finance. A good portfolio is more than a long list of good stocks and bonds; it is a balanced whole providing protections and opportunities across a wide range of contingencies.',
            author: 'Harry Markowitz',
            role: 'Nobel Laureate in Economics, Father of Modern Portfolio Theory',
          },
          {
            quote:
              'In the short run, the market is a voting machine, but in the long run, it is a weighing machine. Confronted with a challenge to distill the secret of sound investment into three words, we venture the motto: Margin of Safety.',
            author: 'Benjamin Graham',
            role: "Father of Value Investing, Author of 'The Intelligent Investor'",
          },
          {
            quote:
              'Markets can remain irrational longer than you can remain solvent. The difficulty lies not so much in developing new ideas as in escaping from old ones.',
            author: 'John Maynard Keynes',
            role: 'Pioneer of Modern Macroeconomics',
          },
          {
            quote:
              'It is not from the benevolence of the butcher, the brewer, or the baker that we expect our dinner, but from their regard to their own interest. By pursuing his own interest, he frequently promotes that of the society more effectually than when he really intends to promote it.',
            author: 'Adam Smith',
            role: "Father of Modern Economics, Author of 'The Wealth of Nations'",
          },
        ],
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle:
          'Everything you need to know about our fiduciary independence, asset custody security, and advisory roadmap.',
        items: [
          {
            question: 'How does our personal financial & portfolio advisory service work?',
            answer:
              'We act as independent fiduciary financial advisors. We evaluate your household income, expenses, liabilities, and risk tolerance to design an individualized asset allocation across equities, ETFs, sovereign bonds, gold, and real estate. You retain full legal custody of your funds on your own brokerage and bank accounts while we provide ongoing strategic recommendations and periodic rebalancing.',
          },
          {
            question: 'Do we ever take direct custody of your funds or investment assets?',
            answer:
              'Never! Your capital and portfolio holdings remain entirely deposited in your personal accounts at licensed banks, regulated securities firms, and fund management companies under your legal name. We provide strategic advisory recommendations only, while you retain complete control over your wealth.',
          },
          {
            question: 'What methodology guides our portfolio allocation strategies?',
            answer:
              'We apply Modern Portfolio Theory, established by Nobel Laureate Prof. Harry Markowitz, paired with the value investing and Margin of Safety principles of Benjamin Graham and Warren Buffett. This systematically diversifies away unsystematic risk while allocating capital to productive, cash-generating assets.',
          },
          {
            question: 'What is the minimum capital required to begin advisory engagement?',
            answer:
              'We provide flexible advisory tiers: from young professionals starting their wealth accumulation journey with modest starting capital, to high-net-worth families requiring multi-asset estate planning, tax optimization, and wealth preservation.',
          },
        ],
      },
      footer: {
        brandDesc:
          'Monarch Securities provides independent, fiduciary financial planning and portfolio management, partnering long-term with your family.',
        servicesHeading: 'Services',
        methodsHeading: 'Methodology',
        legalHeading: 'Legal',
        serviceLinks: {
          services: 'Advisory Services',
          process: 'Planning Process',
          faq: 'Frequently Asked Questions',
        },
        methodLinks: {
          allocation: 'Portfolio Tools',
          constraints: 'Investment Constraints',
          rebalance: 'Portfolio Rebalancing',
        },
        legalLinks: {
          terms: 'Terms of Service',
          privacy: 'Privacy Policy',
        },
        copyright: 'Monarch Securities. Independent personal wealth and portfolio advisory. All rights reserved.',
      },
    },
    dashboard: {
      nav: {
        analysis: 'Analysis',
        monitor: 'Monitor',
        workplace: 'Client Workplace',
        homeTitle: 'Back to Home',
      },
      footer: {
        copyright: 'Monarch Securities',
        home: 'Home',
        faq: 'FAQ',
      },
      analysis: {
        kpi: {
          expectedReturn: 'Expected Annual Return',
          expectedReturnTooltip: 'Annualized E(rc) of the complete optimal portfolio (OCP)',
          expectedReturnMonthly: 'Monthly',
          expectedReturnVsRiskFree: 'vs risk-free rate',
          risk: 'Portfolio Volatility (Risk)',
          riskTooltip: 'Annualized standard deviation σc of the complete portfolio',
          riskMonthly: 'Monthly',
          riskVsVnIndex: 'lower than VN-Index',
          riskFree: 'Risk-Free Rate',
          riskFreeTooltip: 'rf – 10-year Sovereign Government Bond yield',
          riskFreeTenYear: '10-Yr Gov Bond',
          sharpeRatio: 'OCP Sharpe Ratio',
        },
        salesCard: {
          expensesTab: 'Expense Breakdown',
          cashflowTab: 'Cash Flow',
          thisMonth: 'This Month',
          thisQuarter: 'This Quarter',
          thisYear: 'This Year',
          expensesTooltip: 'Expenses',
          cashflowTooltip: 'Amount',
          cashflowSummary: 'Cash Flow Summary',
          expenseItems: {
            'Giáo dục con cái': 'Children’s Education',
            'Thuê nhà': 'Housing Rent',
            'Sinh hoạt gia đình': 'Living Expenses',
            'Trả nợ ngân hàng': 'Debt Service',
            'Giải trí & du lịch': 'Leisure & Travel',
            'Hỗ trợ gia đình': 'Family Support',
          },
          cashflowItems: {
            'Thu nhập anh Nam': 'Nam’s Income',
            'Thu nhập chị Nữ': 'Nu’s Income',
            'Tổng chi tiêu': 'Total Expenses',
            'Thặng dư': 'Net Monthly Surplus',
          },
        },
        topSearch: {
          title: 'Portfolio Stock Holdings',
          subtitle: 'Quarterly price performance tracking',
          srLegend: 'List of stocks in the portfolio',
          vsLastQuarter: 'vs prior quarter',
          orpLabel: 'ORP (Risk Optimal)',
          ocpLabel: 'OCP (Capital Optimal)',
          priorQuarterClose: 'Prior Quarter Close',
          quarterHigh: 'Quarter High',
          quarterLow: 'Quarter Low',
          initialCapital: 'Initial Capital',
          tableCaption: 'Price Performance',
          dateCol: 'Date',
          stockDescriptions: {
            BID: {
              name: 'Bank for Investment and Development of Vietnam (BIDV)',
              sector: 'Banking',
              role: 'Pillar equity providing robust, consistent long-term cash flow',
            },
            HAH: {
              name: 'Hai An Transport and Stevedoring JSC',
              sector: 'Shipping & Logistics',
              role: 'Growth stock delivering superior risk-adjusted capital appreciation',
            },
            SSI: {
              name: 'SSI Securities Corporation',
              sector: 'Financial Services',
              role: 'Direct beneficiary of market liquidity and FTSE emerging market upgrade',
            },
            MSN: {
              name: 'Masan Group Corporation',
              sector: 'Consumer Goods & Retail',
              role: 'Long-term compounding driven by nationwide essential consumer retail',
            },
          },
        },
        proportion: {
          title: 'Asset Allocation Breakdown',
          subtitles: {
            assets: 'Distribution across total owned assets',
            capital: 'Net worth equity vs bank liabilities structure',
            cash: 'Earmarked allocation of liquid cash reserves',
            portfolio: 'Asset weights of the Optimal Complete Portfolio (OCP)',
          },
          totalLabels: {
            assets: 'Total Assets',
            capital: 'Total Capital',
            cash: 'Liquid Cash',
            portfolio: 'Portfolio Capital',
          },
          tabs: {
            assets: 'Assets',
            capital: 'Capital',
            cash: 'Cash Reserves',
            portfolio: 'Portfolio OCP',
          },
          labels: {
            'Đất nền Bảo Lộc': 'Bao Loc Land Property',
            'Tiền mặt': 'Liquid Cash',
            'Cho bạn bè mượn': 'Personal Loan Receivable',
            'Giá trị tài sản ròng': 'Net Worth',
            'Nợ vay ngân hàng': 'Bank Liabilities',
            'Quỹ dự phòng': 'Emergency Fund',
            'Vốn đầu tư ban đầu': 'Initial Portfolio Capital',
            'TPCP 10 năm': '10-Yr Gov Bonds',
            BID: 'BID',
            HAH: 'HAH',
            SSI: 'SSI',
            MSN: 'MSN',
          },
        },
      },
      monitor: {
        chart: {
          timeframes: {
            '1M': '1M',
            '3M': '3M',
            '6M': '6M',
            '1Y': '1Y',
            ALL: 'ALL',
          },
          ma20Tooltip: 'MA20 Moving Average',
          volumeTooltip: 'Trading Volume',
          refreshTooltip: 'Refresh Latest Quote',
          collapseTooltip: 'Collapse (480px)',
          expandTooltip: 'Expand (800px)',
          fullscreenTooltip: 'Full Screen',
          exitFullscreenTooltip: 'Exit Full Screen',
        },
        news: {
          title: 'Market News Feed',
          broadMarket: 'Broad Market',
          searchPlaceholder: 'Search news...',
          refreshTooltip: 'Refresh news',
          emptyText: 'No matching news articles found',
          justNow: 'Just now',
          minutesAgo: 'min ago',
          hoursAgo: 'hrs ago',
          yesterday: 'Yesterday',
          daysAgo: 'days ago',
        },
      },
      workplace: {
        header: {
          title: 'Household Members',
          subtitle: '4-member family · Residing on Luong Dinh Cua St, District 2',
        },
        profiles: {
          husband: {
            tag: 'Head of Household',
            role: 'Accounting Department Manager',
            org: 'Commercial Bank Branch Office',
            income: 'Income: 45,000,000 VND/mo',
            benefit: 'Full Social & Health Insurance',
          },
          wife: {
            tag: 'Spouse',
            role: 'Senior Accountant',
            org: 'Same Bank Branch Office',
            income: 'Income: 20,000,000 VND/mo',
            benefit: 'Full Social & Health Insurance',
          },
          child1: {
            tag: 'Elder Child',
            role: 'Secondary School Student',
            org: 'Tue Duc Secondary School, District 2',
          },
          child2: {
            tag: 'Younger Child',
            role: 'Kindergarten Student',
            org: 'Vuon Hong Kindergarten, District 2',
          },
        },
        benchmark: {
          title: 'Key Portfolio Performance Metrics',
          metricCol: 'Metric',
          metrics: {
            expectedReturn: 'Expected Return E(r)',
            risk: 'Risk Volatility (σ)',
            sharpe: 'Sharpe Ratio',
            utility: 'Expected Utility U',
          },
        },
        radar: {
          title: 'Investment Efficiency Comparison',
          subjects: {
            return: 'Return',
            risk: 'Risk',
            growth: 'Growth',
            sharpe: 'Sharpe',
            utility: 'Utility',
          },
          legends: {
            ocp: 'OCP Portfolio',
            market: 'VN-Index Benchmark',
            bonds: 'Gov Bonds',
          },
          values: {
            growthOcp: '10-Yr Optimal',
            growthMarket: 'Cyclical',
            growthBonds: 'Linear',
          },
        },
        roadmap: {
          title: 'Financial Milestones & Feasibility Analysis',
          subtitle: 'Assumed benchmark inflation rate: 4.5%/year',
          tags: { car: 'Deferred', loanRecovery: 'Reinvested', house: 'Feasible' },
          labels: { need: 'Need', fund: 'Fund' },
          bannerTitle: 'Unified Compounding Mechanism:',
          bannerDesc:
            'The entire roadmap is powered by a continuous compounding growth portfolio. Electing not to withdraw capital prematurely preserves the exponential power of compounding to attain the major homeownership milestone.',
          states: {
            done: 'Feasible · Active',
            current: 'Primary Milestone',
            skipped: 'Deferred · Preserving Capital',
            todo: 'Future Milestone',
          },
          progressSummary: {
            doneFormat: (done, total) => `${done} of ${total} roadmap milestones completed`,
            skippedFormat: (skipped) => ` · ${skipped} deferred to preserve compounding capital`,
          },
          steps: {
            car: {
              title: 'Family Vehicle Purchase',
              duration: '3-Year Horizon',
              badge: 'Deferred · Capital Preservation Priority',
              description: 'For convenient school drop-offs and family weekend commuting.',
              needLabel: 'Inflation-Adjusted Capital Required',
              needAdjusted: '912.93M VND',
              needOriginal: 'base 800M VND',
              fundLabel: 'Projected Portfolio Value at Year 3',
              fundValue: '723.80M VND',
              fundPercent: '79.3% Funded · Shortfall 189.13M VND',
              recommendationTitle: 'Strategic Advisory:',
              recommendationText:
                'Temporarily postpone vehicle purchase to avoid withdrawing 723.80M VND from the fund, preserving the entire principal to compound toward the primary residence goal.',
            },
            loanRecovery: {
              title: 'Personal Loan Recovery',
              duration: '5-Year Horizon',
              badge: 'Cash Inflow · Reinvestment Capital',
              description:
                'Recover full 100.00M VND principal on schedule at month 60 to expand investment portfolio scale.',
              recoveredLabel: 'added to the OCP fund',
              recoveredValue: '+100.00M VND',
              detailsText:
                'The full 100M VND is channeled directly into the OCP portfolio, expanding productive earning assets immediately ahead of the final 5-year compounding sprint.',
            },
            house: {
              title: 'Home Purchase in District 2 / District 9 Area',
              duration: '10-Year Horizon',
              badge: 'Highly Feasible · 153% of Target Funded',
              description: 'Long-term residential milestone near parents’ workplace and children’s schools.',
              needLabel: 'Inflation-Adjusted Capital Required',
              needAdjusted: '5,357.74M VND',
              needOriginal: 'base 3,450M VND',
              fundLabel: 'Projected Portfolio Value at Year 10',
              fundValue: '8,199.80M VND',
              fundPercent: '153.0% Funded · Substantial Capital Surplus',
              outcomeTitle: 'Planning Outcome:',
              outcomeTextPrefix: 'Milestone exceeded with surplus equity of',
              outcomeSurplus: '+2,842.10M VND',
              outcomeTextSuffix:
                '. The family secures 100% debt-free homeownership while retaining a solid capital cushion for future needs.',
            },
          },
        },
      },
      profile: {
        title: 'My Profile',
        subtitle: 'Manage your profile settings and personal information',
        fullNameLabel: 'Full Name',
        fullNamePlaceholder: 'Enter your full name',
        emailLabel: 'Email Address',
        changePhoto: 'Change Photo',
        removePhoto: 'Remove Photo',
        saveChanges: 'Save Changes',
        saving: 'Saving...',
      },
    },
  },
};

