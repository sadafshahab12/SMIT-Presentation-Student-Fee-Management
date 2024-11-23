let receiptLinks = document.querySelectorAll(".receipt-links li");
console.log(receiptLinks);

receiptLinks.forEach((link) => {
  link.addEventListener("click", () => {
    receiptLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});
