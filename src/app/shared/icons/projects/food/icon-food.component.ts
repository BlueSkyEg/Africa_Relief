import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-food',
  standalone: true,
  imports: [],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M27.9 13.8041C29.4056 14.0208 30.4459 14.8222 31.0209 16.2083C31.0737 16.3333 31.1639 16.4222 31.2917 16.475C32.7639 17.0861 33.582 18.1958 33.7459 19.8041C33.7598 19.9347 33.832 20 33.9625 20H36.0375C36.1737 20 36.2431 20.068 36.2459 20.2041C36.2875 23.8513 35.3306 27.1291 33.375 30.0375C30.1209 34.8875 24.9 36.2833 19.0625 36.2083C9.82921 36.0916 3.62504 29.3375 3.74587 20.2166C3.74865 20.0722 3.82088 20 3.96254 20H6.02921C6.15143 20 6.22088 19.9402 6.23754 19.8208C6.54865 17.643 7.79726 16.4416 9.98337 16.2166C10.1056 16.2055 10.1959 16.1458 10.2542 16.0375C11.4737 13.8375 13.2667 13.2375 15.6334 14.2375C15.7473 14.2847 15.8459 14.2638 15.9292 14.175C17.682 12.3055 19.6195 11.9958 21.7417 13.2458C22.1834 13.5069 22.6487 13.6958 23.1375 13.8125C23.5709 13.918 23.9931 14.0652 24.4042 14.2541C24.5264 14.3125 24.6195 14.2819 24.6834 14.1625L30.1584 3.89163C30.2389 3.73885 30.3542 3.70274 30.5042 3.78329L32.2667 4.70413C32.4278 4.78746 32.4653 4.90968 32.3792 5.07079L27.8125 13.6375C27.8045 13.6539 27.8004 13.6721 27.8007 13.6904C27.8009 13.7087 27.8055 13.7267 27.814 13.743C27.8226 13.7592 27.8348 13.7732 27.8497 13.7838C27.8647 13.7945 27.8819 13.8014 27.9 13.8041ZM15.1459 17.45C14.075 15.5166 11.9792 16.1958 12.6625 18.2333C12.6807 18.2868 12.6803 18.3451 12.6615 18.3992C12.6427 18.4534 12.6065 18.5005 12.5584 18.5333L11.5292 19.2083C11.407 19.2888 11.2792 19.2986 11.1459 19.2375C10.2334 18.8125 9.40838 18.3625 8.80004 19.5875C8.7789 19.6312 8.76921 19.6797 8.77188 19.7282C8.77454 19.7768 8.78948 19.8238 8.81528 19.8651C8.84109 19.9063 8.87693 19.9403 8.91944 19.9638C8.96195 19.9874 9.00975 19.9999 9.05837 20L15.9584 19.9958C16.25 19.9958 16.3889 19.8513 16.375 19.5625L16.35 19.1875C16.3417 19.018 16.4181 18.9069 16.5792 18.8541C16.7375 18.8013 16.8959 18.7861 17.0542 18.8083C17.2042 18.825 17.3042 18.9041 17.3542 19.0458C17.4098 19.2097 17.4139 19.3819 17.3667 19.5625C17.2917 19.8541 17.4056 20 17.7084 20H24.9584C25.1306 20 25.2 19.9152 25.1667 19.7458L25.0959 19.3666C25.0681 19.2222 25.1014 19.093 25.1959 18.9791C25.3403 18.8013 25.5403 18.7361 25.7959 18.7833C25.9653 18.8138 26.0709 18.9125 26.1125 19.0791C26.157 19.2513 26.1542 19.4291 26.1042 19.6125C26.032 19.868 26.1292 19.9972 26.3959 20L30.8959 20.0041C30.954 20.0042 31.011 19.9882 31.0606 19.958C31.1103 19.9277 31.1507 19.8845 31.1773 19.8328C31.204 19.7812 31.216 19.7232 31.2119 19.6652C31.2078 19.6072 31.1879 19.5515 31.1542 19.5041L31 19.2833C30.7639 18.9472 30.4389 18.7736 30.025 18.7625L29 18.7333C28.9359 18.7312 28.875 18.7045 28.8301 18.6587C28.7851 18.6129 28.7594 18.5516 28.7584 18.4875C28.7459 17.9708 28.8167 17.3875 28.5875 16.9458C28.0625 15.9333 26.5959 16.0541 26.3209 17.2666C26.3058 17.3329 26.2683 17.3921 26.2145 17.4345C26.1608 17.4769 26.094 17.5 26.025 17.5L24.0834 17.4958C23.9084 17.4958 23.7889 17.4152 23.725 17.2541C23.3528 16.3347 22.6862 16.0583 21.725 16.425C21.6624 16.4497 21.5937 16.455 21.5276 16.4402C21.4615 16.4253 21.4011 16.391 21.3542 16.3416C20.9709 15.9458 20.7334 15.4833 20.275 15.2458C18.6792 14.4208 17.5834 15.6666 17.4125 17.275C17.4068 17.3296 17.3819 17.3805 17.3422 17.4187C17.3026 17.4568 17.2508 17.4797 17.1959 17.4833L15.4084 17.5916C15.2917 17.6 15.2042 17.5527 15.1459 17.45ZM33.5042 22.5H6.49588C6.49256 22.5 6.48938 22.5013 6.48704 22.5036C6.48469 22.506 6.48338 22.5091 6.48338 22.5125V22.5416C6.48338 25.5143 7.85872 28.3651 10.3069 30.4671C11.519 31.5079 12.9581 32.3335 14.5419 32.8968C16.1257 33.46 17.8232 33.75 19.5375 33.75H20.4625C23.9247 33.75 27.2451 32.5691 29.6932 30.4671C32.1414 28.3651 33.5167 25.5143 33.5167 22.5416V22.5125C33.5167 22.5091 33.5154 22.506 33.513 22.5036C33.5107 22.5013 33.5075 22.5 33.5042 22.5Z" fill="#1F1F1F"/>
      <path d="M19.379 18.7167C19.7081 18.7167 19.9749 18.4499 19.9749 18.1209C19.9749 17.7918 19.7081 17.525 19.379 17.525C19.05 17.525 18.7832 17.7918 18.7832 18.1209C18.7832 18.4499 19.05 18.7167 19.379 18.7167Z" fill="#1F1F1F"/>
    </svg>
  `,
  styles: ``
})
export class IconFoodComponent {

}