document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS with custom settings
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      delay: 100,
      easing: "ease-in-out",
      mirror: false,
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Add animation class before scrolling
        targetElement.classList.add("highlight-section")

        window.scrollTo({
          top: targetElement.offsetTop - 100, // Offset for fixed header
          behavior: "smooth",
        })

        // Remove animation class after scrolling
        setTimeout(() => {
          targetElement.classList.remove("highlight-section")
        }, 2000)
      }
    })
  })

  // Enhanced Navbar color change on scroll with animation
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        if (!navbar.classList.contains("scrolled")) {
          navbar.classList.add("scrolled")
          navbar.style.transition = "all 0.3s ease"
        }
      } else {
        if (navbar.classList.contains("scrolled")) {
          navbar.classList.remove("scrolled")
        }
      }
    })
  }

  // Dark mode toggle with localStorage and animation
  const darkModeToggle = document.getElementById("darkModeToggle")
  const body = document.body
  const icon = darkModeToggle ? darkModeToggle.querySelector("i") : null

  // Check if dark mode is enabled in localStorage
  if (localStorage.getItem("darkMode") === "enabled" && icon) {
    body.classList.add("dark-mode")
    icon.classList.remove("fa-moon")
    icon.classList.add("fa-sun")
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      // Add animation class
      body.classList.add("fade-transition")

      // Toggle dark mode
      body.classList.toggle("dark-mode")

      if (body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon")
        icon.classList.add("fa-sun")
        localStorage.setItem("darkMode", "enabled")
      } else {
        icon.classList.remove("fa-sun")
        icon.classList.add("fa-moon")
        localStorage.setItem("darkMode", "disabled")
      }

      // Remove animation class after transition
      setTimeout(() => {
        body.classList.remove("fade-transition")
      }, 500)
    })
  }

  // Update date and time in Arabic with animation
  function updateDateTime() {
    const now = new Date()

    // Format date in Arabic
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    const dateStr = new Intl.DateTimeFormat("ar-TN", dateOptions).format(now)

    // Format time
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }
    const timeStr = new Intl.DateTimeFormat("ar-TN", timeOptions).format(now)

    // Update the DOM with animation
    const dateElement = document.getElementById("current-date")
    const timeElement = document.getElementById("current-time")

    if (dateElement) {
      if (dateElement.textContent !== dateStr) {
        dateElement.classList.add("fade-in")
        dateElement.textContent = dateStr
        setTimeout(() => {
          dateElement.classList.remove("fade-in")
        }, 500)
      }
    }

    if (timeElement) {
      timeElement.classList.add("fade-in")
      timeElement.textContent = timeStr
      setTimeout(() => {
        timeElement.classList.remove("fade-in")
      }, 500)
    }
  }

  // Initialize date and time and update every second
  updateDateTime()
  setInterval(updateDateTime, 1000)

  // Visitor counter functionality with animation
  // Visitor Counter - Client Side


// Visitor counter
function updateVisitorCounter() {
  // Get current date
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const thisWeek = today - now.getDay() * 24 * 60 * 60 * 1000
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime()

  // Initialize counters from localStorage or set to default values
  let allTimeVisits = Number.parseInt(localStorage.getItem("allTimeVisits") || "0")
  let monthlyVisits = Number.parseInt(localStorage.getItem("monthlyVisits") || "0")
  let weeklyVisits = Number.parseInt(localStorage.getItem("weeklyVisits") || "0")
  let dailyVisits = Number.parseInt(localStorage.getItem("dailyVisits") || "0")

  // Check if we need to reset any counters
  const lastVisit = Number.parseInt(localStorage.getItem("lastVisit") || "0")
  const lastVisitDate = new Date(lastVisit)

  // Reset daily counter if it's a new day
  if (lastVisit && lastVisitDate.getDate() !== now.getDate()) {
    dailyVisits = 0
  }

  // Reset weekly counter if it's a new week
  if (lastVisit && new Date(lastVisit).getTime() < thisWeek) {
    weeklyVisits = 0
  }

  // Reset monthly counter if it's a new month
  if (lastVisit && lastVisitDate.getMonth() !== now.getMonth()) {
    monthlyVisits = 0
  }

  // Increment counters
  allTimeVisits++
  monthlyVisits++
  weeklyVisits++
  dailyVisits++

  // Save to localStorage
  localStorage.setItem("allTimeVisits", allTimeVisits.toString())
  localStorage.setItem("monthlyVisits", monthlyVisits.toString())
  localStorage.setItem("weeklyVisits", weeklyVisits.toString())
  localStorage.setItem("dailyVisits", dailyVisits.toString())
  localStorage.setItem("lastVisit", now.getTime().toString())

  // Update the DOM with animation
  const allTimeElement = document.getElementById("all-time-visits")
  const monthlyElement = document.getElementById("monthly-visits")
  const weeklyElement = document.getElementById("weekly-visits")
  const dailyElement = document.getElementById("daily-visits")

  function animateCounter(element, value) {
    if (!element) return

    // Animate counting up
    const duration = 1000
    const startTime = performance.now()
    const startValue = Number.parseInt(element.textContent) || 0
    const endValue = value

    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration
        const currentValue = Math.floor(startValue + progress * (endValue - startValue))
        element.textContent = currentValue.toString()
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = endValue.toString()
      }
    }

    requestAnimationFrame(updateCounter)
  }

  if (allTimeElement) animateCounter(allTimeElement, allTimeVisits)
  if (monthlyElement) animateCounter(monthlyElement, monthlyVisits)
  if (weeklyElement) animateCounter(weeklyElement, weeklyVisits)
  if (dailyElement) animateCounter(dailyElement, dailyVisits)
}

// Only count a visit once per session
if (!sessionStorage.getItem("visitCounted")) {
  updateVisitorCounter()
  sessionStorage.setItem("visitCounted", "true")
} else {
  // Just display the current counts without incrementing
  const allTimeElement = document.getElementById("all-time-visits")
  const monthlyElement = document.getElementById("monthly-visits")
  const weeklyElement = document.getElementById("weekly-visits")
  const dailyElement = document.getElementById("daily-visits")

  if (allTimeElement) allTimeElement.textContent = localStorage.getItem("allTimeVisits") || "0"
  if (monthlyElement) monthlyElement.textContent = localStorage.getItem("monthlyVisits") || "0"
  if (weeklyElement) weeklyElement.textContent = localStorage.getItem("weeklyVisits") || "0"
  if (dailyElement) dailyElement.textContent = localStorage.getItem("dailyVisits") || "0"
}

  // Enhanced Slideshow Animation
  const carousel = document.getElementById("latestUpdatesCarousel")
  if (carousel && typeof bootstrap !== "undefined") {
    // Initialize Bootstrap carousel with custom options
    const bsCarousel = new bootstrap.Carousel(carousel, {
      interval: 5000, // Change slide every 5 seconds
      wrap: true, // Continuous loop
      touch: true, // Enable touch swiping on mobile
      pause: "hover", // Pause on mouse hover
    })

    // Add custom animation classes to slides when they change
    carousel.addEventListener("slide.bs.carousel", (event) => {
      const activeItem = carousel.querySelector(".carousel-item.active")
      const nextItem = event.relatedTarget

      // Add animation classes
      activeItem.classList.add("animate__animated", "animate__fadeOut")
      nextItem.classList.add("animate__animated", "animate__fadeIn")

      // Remove animation classes after animation completes
      setTimeout(() => {
        activeItem.classList.remove("animate__animated", "animate__fadeOut")
        nextItem.classList.remove("animate__animated", "animate__fadeIn")
      }, 1000)
    })
  }

  // Back to Top Button Functionality with enhanced animation
  const scrollToTopBtn = document.getElementById("scrollToTopBtn")

  if (scrollToTopBtn) {
    // Show/hide button based on scroll position with animation
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        if (!scrollToTopBtn.classList.contains("show")) {
          scrollToTopBtn.classList.add("show")
          scrollToTopBtn.classList.add("bounce")
          setTimeout(() => {
            scrollToTopBtn.classList.remove("bounce")
          }, 1000)
        }
      } else {
        if (scrollToTopBtn.classList.contains("show")) {
          scrollToTopBtn.classList.add("slide-down")
          setTimeout(() => {
            scrollToTopBtn.classList.remove("show")
            scrollToTopBtn.classList.remove("slide-down")
          }, 300)
        }
      }
    })

    // Scroll to top when button is clicked with smooth animation
    scrollToTopBtn.addEventListener("click", () => {
      // Add rotation animation
      scrollToTopBtn.classList.add("rotate-animation")

      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })

      // Remove animation class after scrolling
      setTimeout(() => {
        scrollToTopBtn.classList.remove("rotate-animation")
      }, 1000)
    })
  }

  // Contact Form Submission with EmailJS and enhanced animation
 // Contact Form - Client Side
const contactForm = document.getElementById("commentForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    try {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';

      // Optionally, you can trigger the Netlify form submission here if you want custom feedback
      // No need for fetch or server call with Netlify's built-in form handling.

      // Reset the form after submission
      contactForm.reset();
      showSuccessMessage();
      
    } catch (error) {
      showErrorMessage();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

function showSuccessMessage() {
  const successModal = new bootstrap.Modal(document.getElementById("successModal"));
  successModal.show();
  document.querySelector(".modal-content").classList.add("animate__zoomIn");
}

function showErrorMessage() {
  alert("حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقًا.");
}


  // Search functionality
  const searchForm = document.getElementById("searchForm")
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const searchInput = searchForm.querySelector("input").value.trim()
      if (searchInput.length < 2) {
        alert("الرجاء إدخال كلمة بحث تحتوي على حرفين على الأقل")
        return
      }

      // Redirect to search results page with query parameter
      window.location.href = `search-results.html?q=${encodeURIComponent(searchInput)}`
    })
  }

  // Handle search results page
  if (window.location.pathname.includes("search-results.html")) {
    const urlParams = new URLSearchParams(window.location.search)
    const searchQuery = urlParams.get("q")

    if (searchQuery) {
      const searchTermElement = document.getElementById("search-term")
      if (searchTermElement) {
        searchTermElement.textContent = searchQuery
      }

      // Simulate search results with animation
      const searchResultsContainer = document.querySelector(".search-results-container")
      if (searchResultsContainer) {
        searchResultsContainer.innerHTML =
          '<div class="text-center my-5"><i class="fas fa-spinner fa-spin fa-3x"></i><p class="mt-3">جاري البحث...</p></div>'

        // Simulate API call delay
        setTimeout(() => {
          // Replace with actual search results
          searchResultsContainer.innerHTML = generateSearchResults(searchQuery)

          // Add animation to results
          const resultItems = document.querySelectorAll(".search-result-item")
          resultItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("slide-up")
            }, index * 100)
          })
        }, 1500)
      }
    }
  }

  // Function to generate search results
  function generateSearchResults(query) {
    // Define the content to search through
    // In a real implementation, this would be fetched from the server or a database
    const searchableContent = [
      {
        title: "التراث الثقافي في تونس: دراسة تحليلية",
        category: "كتب",
        content:
          "دراسة شاملة حول التراث الثقافي في تونس وأهميته في الهوية الوطنية والتنمية المستدامة. يتناول الكتاب مفهوم التراث الثقافي وتأثيره على المجتمع التونسي والهوية الوطنية.",
        url: "article-heritage.html",
      },
      {
        title: "المهرجانات الثقافية ودورها في التنمية المحلية",
        category: "مقالات",
        content:
          "مقال يناقش أهمية المهرجانات الثقافية في تعزيز التنمية المحلية وتنشيط السياحة الثقافية. يشير المقال إلى دور المهرجانات في تعزيز الاقتصاد المحلي وإبراز الثقافة التونسية.",
        url: "article-festivals.html",
      },
      {
        title: "محمية المبدعين",
        category: "مشاريع",
        content:
          "برنامج مبتكر مخصص للفنون الحية في المنطقة الجبلية بالكاف. يعتبر هذا المشروع من أهم المشاريع الثقافية في المنطقة ويهدف إلى دعم المبدعين المحليين.",
        url: "article-reserve.html",
      },
      {
        title: "مكلف بإدارة المركز الوطني للسينما والصورة",
        category: "خبرات",
        content:
          "القيادة المؤسسية: الإشراف على الفرق، وإدارة الميزانيات وتنسيق أنشطة المركز. تعزيز السينما التونسية: تنظيم العروض والمهرجانات الدولية وورش العمل لدعم صانعي الأفلام الشباب.",
        url: "article-cinema.html",
      },
      {
        title: "المندوب الجهوي للشؤون الثقافية",
        category: "خبرات",
        content:
          "الاستراتيجية الثقافية: وضع وتنفيذ خطط إقليمية متوافقة مع الأولويات الوطنية لتعزيز الفنون والثقافة. إدارة المشاريع الكبرى: تنظيم المهرجانات الإقليمية والوطنية والفعاليات الأدبية.",
        url: "article-delegate.html",
      },
      {
        title: "تونس تغني صليحة",
        category: "وسائط",
        content:
          "حدث موسيقي وطني يحتفي بإرث صليحة، أيقونة الموسيقى التونسية. يسلط هذا الموعد الضوء على دورها الرئيسي في تطور الموسيقى التونسية وثراء أغانيها.",
        url: "article-saliha.html",
      },
    ]

    // Convert query to lowercase for case-insensitive search
    const queryLower = query.toLowerCase()

    // Filter content that contains the query in title or content
    const results = searchableContent.filter(
      (item) => item.title.toLowerCase().includes(queryLower) || item.content.toLowerCase().includes(queryLower),
    )

    if (results.length === 0) {
      return `<div class="alert alert-info">لم يتم العثور على نتائج تطابق "${query}"</div>`
    }

    let html = `<p>تم العثور على ${results.length} نتائج لـ "${query}"</p><div class="search-results">`

    results.forEach((result) => {
      // Extract a snippet of content around the query
      let excerpt = result.content
      const queryIndex = result.content.toLowerCase().indexOf(queryLower)

      if (queryIndex > -1) {
        // Get a snippet around the query
        const startIndex = Math.max(0, queryIndex - 50)
        const endIndex = Math.min(result.content.length, queryIndex + query.length + 50)
        excerpt = "..." + result.content.substring(startIndex, endIndex) + "..."
      }

      // Highlight search term in excerpt
      const highlightedExcerpt = excerpt.replace(
        new RegExp(query, "gi"),
        (match) => `<span class="search-highlight">${match}</span>`,
      )

      html += `
  <div class="search-result-item">
    <h3 class="search-result-title"><a href="${result.url}">${result.title}</a></h3>
    <span class="search-result-category">${result.category}</span>
    <p class="search-result-excerpt">${highlightedExcerpt}</p>
    <a href="${result.url}" class="btn btn-sm btn-primary">عرض المزيد</a>
  </div>
  `
    })

    html += "</div>"
    return html
  }

  // Also update the modal search form to use the same functionality
  const modalSearchForm = document.getElementById("modalSearchForm")
  if (modalSearchForm) {
    modalSearchForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const searchInput = modalSearchForm.querySelector("input").value.trim()
      if (searchInput.length < 2) {
        alert("الرجاء إدخال كلمة بحث تحتوي على حرفين على الأقل")
        return
      }

      // Close the modal if it exists
      const searchModal = document.getElementById("searchModal")
      if (searchModal && typeof bootstrap !== "undefined") {
        const bsModal = bootstrap.Modal.getInstance(searchModal)
        if (bsModal) {
          bsModal.hide()
        }
      }

      // Redirect to search results page
      window.location.href = `search-results.html?q=${encodeURIComponent(searchInput)}`
    })
  }

  // Gallery functionality
  const galleryItems = document.querySelectorAll(".gallery-item")
  if (galleryItems.length > 0) {
    galleryItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        openGalleryModal(index)
      })
    })
  }

  // Function to open gallery modal
  function openGalleryModal(index) {
    const galleryModal = document.getElementById("galleryModal")
    if (!galleryModal) return

    const modalImage = galleryModal.querySelector(".modal-gallery-image")
    const modalTitle = galleryModal.querySelector(".modal-gallery-title")
    const modalDescription = galleryModal.querySelector(".modal-gallery-description")
    const prevBtn = galleryModal.querySelector(".gallery-prev")
    const nextBtn = galleryModal.querySelector(".gallery-next")

    // Get all gallery items
    const items = document.querySelectorAll(".gallery-item")
    const currentItem = items[index]

    // Set modal content
    modalImage.src = currentItem.querySelector("img").src
    modalTitle.textContent = currentItem.querySelector(".gallery-title").textContent
    modalDescription.textContent = currentItem.querySelector(".gallery-description").textContent

    // Set current index
    galleryModal.setAttribute("data-current-index", index)

    // Show modal
    if (typeof bootstrap !== "undefined") {
      const bsGalleryModal = new bootstrap.Modal(galleryModal)
      bsGalleryModal.show()

      // Navigation buttons
      prevBtn.addEventListener("click", () => {
        navigateGallery("prev")
      })

      nextBtn.addEventListener("click", () => {
        navigateGallery("next")
      })

      // Keyboard navigation
      document.addEventListener("keydown", galleryKeyboardNavigation)
    }
  }

  // Function to navigate gallery
  function navigateGallery(direction) {
    const galleryModal = document.getElementById("galleryModal")
    if (!galleryModal) return

    const currentIndex = Number.parseInt(galleryModal.getAttribute("data-current-index"))
    const items = document.querySelectorAll(".gallery-item")
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
    } else {
      newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
    }

    // Update modal content with animation
    const modalImage = galleryModal.querySelector(".modal-gallery-image")
    const modalTitle = galleryModal.querySelector(".modal-gallery-title")
    const modalDescription = galleryModal.querySelector(".modal-gallery-description")

    // Add fade out animation
    modalImage.classList.add("fade-out")
    modalTitle.classList.add("fade-out")
    modalDescription.classList.add("fade-out")

    setTimeout(() => {
      // Update content
      const newItem = items[newIndex]
      modalImage.src = newItem.querySelector("img").src
      modalTitle.textContent = newItem.querySelector(".gallery-title").textContent
      modalDescription.textContent = newItem.querySelector(".gallery-description").textContent

      // Update current index
      galleryModal.setAttribute("data-current-index", newIndex)

      // Add fade in animation
      modalImage.classList.remove("fade-out")
      modalImage.classList.add("fade-in")
      modalTitle.classList.remove("fade-out")
      modalTitle.classList.add("fade-in")
      modalDescription.classList.remove("fade-out")
      modalDescription.classList.add("fade-in")

      // Remove animation classes after animation completes
      setTimeout(() => {
        modalImage.classList.remove("fade-in")
        modalTitle.classList.remove("fade-in")
        modalDescription.classList.remove("fade-in")
      }, 500)
    }, 300)
  }

  // Keyboard navigation for gallery
  function galleryKeyboardNavigation(e) {
    if (e.key === "ArrowLeft") {
      navigateGallery("next") // Reversed for RTL
    } else if (e.key === "ArrowRight") {
      navigateGallery("prev") // Reversed for RTL
    } else if (e.key === "Escape") {
      const galleryModal = document.getElementById("galleryModal")
      if (galleryModal && typeof bootstrap !== "undefined") {
        const bsGalleryModal = bootstrap.Modal.getInstance(galleryModal)
        if (bsGalleryModal) {
          bsGalleryModal.hide()
          document.removeEventListener("keydown", galleryKeyboardNavigation)
        }
      }
    }
  }

  // Language switcher
  const languageBtns = document.querySelectorAll(".language-switcher button")
  if (languageBtns.length > 0) {
    languageBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        languageBtns.forEach((b) => b.classList.remove("active"))
        // Add active class to clicked button
        btn.classList.add("active")

        // Here you would implement actual language switching
        // For now, just show an alert
        alert(`تم تغيير اللغة إلى ${btn.textContent}. هذه الميزة قيد التطوير.`)
      })
    })
  }

  // Add print date to content page for print stylesheet
  const contentPage = document.querySelector(".content-page")
  if (contentPage) {
    const now = new Date()
    const printDate = now.toLocaleDateString("ar-TN")
    contentPage.setAttribute("data-print-date", printDate)
  }

  // Publication filtering
  const filterBtns = document.querySelectorAll(".filter-btn")
  const publicationCards = document.querySelectorAll(".publication-card")

  if (filterBtns.length > 0 && publicationCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove("active"))
        // Add active class to clicked button
        this.classList.add("active")

        const filter = this.getAttribute("data-filter")

        publicationCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = "block"
            card.classList.add("fade-in")
            setTimeout(() => {
              card.classList.remove("fade-in")
            }, 500)
          } else {
            card.classList.add("fade-out")
            setTimeout(() => {
              card.style.display = "none"
              card.classList.remove("fade-out")
            }, 300)
          }
        })
      })
    })
  }

  // Initialize any tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  if (tooltipTriggerList.length > 0 && typeof bootstrap !== "undefined") {
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
  }

  // Initialize any popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  if (popoverTriggerList.length > 0 && typeof bootstrap !== "undefined") {
    popoverTriggerList.map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl))
  }

  // Add this code to highlight the active nav item based on current page
  // Get current page path
  const currentPath = window.location.pathname
  const navLinks = document.querySelectorAll(".navbar .nav-link")

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href")

    // Check if the link href matches the current path
    if (
      currentPath.endsWith(linkPath) ||
      (currentPath.endsWith("/") && linkPath === "index.html") ||
      (currentPath.includes(linkPath) && linkPath !== "index.html")
    ) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })

  // Handle article share buttons
  const shareButtons = document.querySelectorAll(".share-button")
  if (shareButtons.length > 0) {
    shareButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()

        const url = window.location.href
        const title = document.title

        if (button.classList.contains("share-facebook")) {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            "facebook-share",
            "width=580,height=296",
          )
        } else if (button.classList.contains("share-twitter")) {
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            "twitter-share",
            "width=550,height=235",
          )
        } else if (button.classList.contains("share-linkedin")) {
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            "linkedin-share",
            "width=750,height=450",
          )
        } else if (button.classList.contains("share-whatsapp")) {
          window.open(
            `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`,
            "whatsapp-share",
            "width=580,height=296",
          )
        }
      })
    })
  }

  // Handle download buttons
  const downloadButtons = document.querySelectorAll('a[href="#"][class*="download"], a[href="#"] i.fa-download')
  if (downloadButtons.length > 0) {
    downloadButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()

        // Create a demo PDF file for download
        const fileName = button.textContent.includes("PDF") ? "ملخص_الكتاب.pdf" : "ملف_تحميل.pdf"

        // Show a message
        alert(`جاري تحميل الملف: ${fileName}`)

        // In a real implementation, you would redirect to an actual file
        // window.location.href = fileName;
      })
    })
  }

  // Handle print button
  const printButton = document.querySelector('button[onclick="window.print()"]')
  if (printButton) {
    printButton.addEventListener("click", (e) => {
      e.preventDefault()
      window.print()
    })
  }

  // Handle subscription form
  const subscriptionForm = document.querySelector(".subscription-form")
  if (subscriptionForm) {
    subscriptionForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const emailInput = subscriptionForm.querySelector('input[type="email"]')
      const email = emailInput.value.trim()

      if (!email) {
        alert("الرجاء إدخال بريدك الإلكتروني")
        return
      }

      // Check if privacy checkbox is checked
      const privacyCheck = subscriptionForm.querySelector("#privacyCheck")
      if (privacyCheck && !privacyCheck.checked) {
        alert("الرجاء الموافقة على سياسة الخصوصية وشروط الاستخدام")
        return
      }

      // Show success message
      alert(`تم الاشتراك بنجاح باستخدام البريد الإلكتروني: ${email}`)

      // Reset form
      subscriptionForm.reset()
    })
  }

  // Handle gallery filter buttons
  const galleryFilterBtns = document.querySelectorAll(".filter-btn[data-filter]")

  const gallery_Items = document.querySelectorAll(".gallery-item")

  if (galleryFilterBtns.length > 0 && gallery_Items.length > 0) {
    galleryFilterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        galleryFilterBtns.forEach((b) => b.classList.remove("active"))
        // Add active class to clicked button
        this.classList.add("active")

        const filter = this.getAttribute("data-filter")

        gallery_Items.forEach((item) => {
          if (filter === "all" || item.getAttribute("data-category") === filter) {
            item.style.display = "block"
            item.classList.add("fade-in")
            setTimeout(() => {
              item.classList.remove("fade-in")
            }, 500)
          } else {
            item.classList.add("fade-out")
            setTimeout(() => {
              item.style.display = "none"
              item.classList.remove("fade-out")
            }, 300)
          }
        })
      })
    })
  }

  // Handle pagination buttons
  const paginationLinks = document.querySelectorAll(".pagination .page-link")
  if (paginationLinks.length > 0) {
    paginationLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()

        // Remove active class from all pagination items
        document.querySelectorAll(".pagination .page-item").forEach((item) => {
          item.classList.remove("active")
        })

        // Add active class to parent of clicked link
        this.parentElement.classList.add("active")

        // In a real implementation, you would load the next page of content
        // For demo purposes, scroll to top with animation
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    })
  }
})
