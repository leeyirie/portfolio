document.addEventListener('DOMContentLoaded', () => {
    const researchSections = document.querySelectorAll('.research-section');

    researchSections.forEach((section) => {
        const infoContent = section.querySelector('.info-content');
        const outcomeGrid = section.querySelector('.outcome-grid');

        // 스크롤 시 현재 이미지 업데이트
        const updateCurrentImage = () => {
            const outcomes = section.querySelectorAll('.outcome-item');
            outcomes.forEach((outcome, index) => {
                const rect = outcome.getBoundingClientRect();
                if (
                    rect.top < window.innerHeight / 2 &&
                    rect.bottom > window.innerHeight / 2
                ) {
                    const img = outcome.querySelector('img');
                    const currentImage =
                        infoContent.querySelector('.current-image img');
                    const imageNumber =
                        infoContent.querySelector('.image-number');

                    currentImage.src = img.src;
                    imageNumber.textContent = `${(index + 1)
                        .toString()
                        .padStart(2, '0')}/${outcomes.length}`;
                }
            });
        };

        window.addEventListener('scroll', updateCurrentImage);
        updateCurrentImage();
    });

    // 이미지 페이드인 효과
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );

    images.forEach((img) => {
        img.style.opacity = '0';
        img.style.transform = 'translateY(20px)';
        img.style.transition = 'all 0.6s ease-out';
        imageObserver.observe(img);
    });

    const modal = document.getElementById('welcome-modal');
    const container = document.querySelector('.container');
    const continueButton = document.getElementById('continue-button');

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', function () {
        const header = document.querySelector('.research-header');
        const researchInfo = document.querySelector('.research-info');

        // 헤더의 높이
        const headerHeight = header.offsetHeight;

        // 현재 스크롤 위치
        const scrollY = window.scrollY;

        // 스크롤 위치가 헤더의 높이보다 크면
        if (scrollY > headerHeight) {
            // research-info의 top을 헤더 높이만큼 설정
            researchInfo.style.position = 'fixed';
            researchInfo.style.top = `${headerHeight}px`;
        } else {
            // 원래 위치로 되돌리기
            researchInfo.style.position = 'sticky';
            researchInfo.style.top = 'initial';
        }
    });
});
