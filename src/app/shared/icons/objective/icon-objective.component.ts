import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-objective',
  standalone: true,
  imports: [],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M22.9963 23.1701C22.7474 24.8945 21.7541 25.8412 20.0163 26.0101C19.8963 26.0212 19.8063 26.079 19.7463 26.1834C19.2041 27.1145 18.5207 27.8701 17.6963 28.4501C15.7796 29.7901 13.2663 28.5601 13.0363 26.1934C13.0252 26.0823 12.9652 26.0201 12.8563 26.0068C11.1852 25.7801 10.2341 24.8356 10.003 23.1734C9.98963 23.0734 9.93296 23.0168 9.83296 23.0034C8.17963 22.7723 7.23741 21.8312 7.00629 20.1801C6.99296 20.0823 6.93741 20.0256 6.83963 20.0101C4.88629 19.6945 3.94963 18.5312 4.02963 16.5201C4.03629 16.3956 3.99963 16.2856 3.91963 16.1901C-0.387039 11.0134 2.96629 3.80009 9.33296 3.08675C11.7552 2.81564 13.9341 3.38009 15.8696 4.78009C15.9092 4.80932 15.9571 4.82509 16.0063 4.82509C16.0555 4.82509 16.1034 4.80932 16.143 4.78009C23.523 -0.52658 33.7796 6.97342 28.6063 15.4301C28.4596 15.6679 28.4696 15.8968 28.6363 16.1168C28.7041 16.2065 28.7477 16.3109 28.763 16.4201C29.0607 18.489 28.1907 19.6968 26.153 20.0434C26.0552 20.0612 25.9985 20.1201 25.983 20.2201C25.7496 21.8445 24.8119 22.7712 23.1696 23.0001C23.0696 23.0134 23.0119 23.0701 22.9963 23.1701ZM18.603 17.4301C18.683 17.3545 18.7607 17.3556 18.8363 17.4334L21.9763 20.7201C22.0825 20.8311 22.2096 20.9201 22.3502 20.982C22.4909 21.0438 22.6424 21.0772 22.796 21.0803C22.9497 21.0834 23.1024 21.0561 23.2454 21C23.3885 20.9439 23.5191 20.8601 23.6296 20.7534L23.8163 20.5734C23.9688 20.4264 24.0569 20.2248 24.0612 20.0125C24.0656 19.8003 23.986 19.5945 23.8396 19.4401L20.383 15.8001C20.3096 15.7223 20.3118 15.6456 20.3896 15.5701L21.603 14.4301C21.6852 14.3523 21.7641 14.3534 21.8396 14.4334L25.0463 17.7968C25.1484 17.9036 25.2716 17.9882 25.408 18.0451C25.5445 18.1021 25.6914 18.1302 25.8394 18.1277C25.9874 18.1251 26.1334 18.0921 26.2682 18.0306C26.4031 17.969 26.5238 17.8804 26.623 17.7701L26.813 17.5601C26.9586 17.3977 27.0368 17.1858 27.0319 16.9674C27.0269 16.7489 26.9391 16.5402 26.7863 16.3834L20.9396 10.3901C20.6841 10.1274 20.3346 9.97706 19.9678 9.97206C19.6009 9.96706 19.2468 10.1078 18.983 10.3634C17.6396 11.6701 15.7163 14.1668 13.713 13.9734C11.8496 13.7968 10.6163 11.9901 11.1563 10.1734C11.563 8.81675 13.333 7.47675 14.3963 6.44675C14.4852 6.36009 14.4818 6.27787 14.3863 6.20009C12.803 4.91675 10.2196 4.79342 8.36963 5.28009C4.37296 6.33342 2.80963 11.0734 5.11296 14.4368C5.12606 14.4556 5.14333 14.4713 5.1634 14.4824C5.18346 14.4935 5.20574 14.4999 5.22846 14.5008C5.25117 14.5018 5.27366 14.4974 5.29413 14.488C5.3146 14.4786 5.33247 14.4645 5.34629 14.4468C7.1063 12.1801 10.6396 12.6534 10.973 15.8068C10.9778 15.8553 10.9988 15.9008 11.0327 15.9359C11.0666 15.9709 11.1113 15.9936 11.1596 16.0001C12.8241 16.2268 13.7685 17.1701 13.993 18.8301C14.0063 18.9301 14.063 18.9868 14.163 19.0001C15.8296 19.229 16.7741 20.1768 16.9963 21.8434C17.0096 21.9501 17.0696 22.0079 17.1763 22.0168C18.3519 22.119 19.193 22.6979 19.6996 23.7534C19.73 23.8167 19.774 23.8725 19.8285 23.9168C19.883 23.9611 19.9465 23.9928 20.0147 24.0097C20.0828 24.0266 20.1539 24.0282 20.2227 24.0144C20.2916 24.0007 20.3565 23.9719 20.413 23.9301C21.1419 23.3856 21.1863 22.7812 20.5463 22.1168C19.4463 20.9723 18.3941 19.8701 17.3896 18.8101C17.3096 18.7256 17.3118 18.6434 17.3963 18.5634L18.603 17.4301ZM18.853 8.18675C19.9396 7.81342 21.4363 8.04009 22.313 8.93675C23.9041 10.5656 25.4885 12.1868 27.0663 13.8001C27.0761 13.8095 27.088 13.8165 27.101 13.8207C27.1139 13.8248 27.1277 13.826 27.1411 13.8241C27.1546 13.8221 27.1675 13.8172 27.1788 13.8096C27.1901 13.8019 27.1995 13.7919 27.2063 13.7801C30.243 8.28342 24.093 3.30675 18.823 5.52342C16.9696 6.30342 14.9096 8.73009 13.2663 10.3368C12.7796 10.8145 12.7963 11.2734 13.3163 11.7134L13.463 11.8368C13.6191 11.9689 13.8181 12.0392 14.0222 12.0343C14.2263 12.0293 14.4211 11.9496 14.5696 11.8101C15.7663 10.6934 17.513 8.64675 18.853 8.18675ZM8.71959 16.6769C8.89712 16.4993 8.99686 16.2585 8.99686 16.0075C8.99686 15.7564 8.89712 15.5156 8.71959 15.3381L8.65829 15.2768C8.48076 15.0993 8.23998 14.9995 7.98891 14.9995C7.73785 14.9995 7.49706 15.0993 7.31953 15.2768L6.27299 16.3233C6.09547 16.5009 5.99573 16.7416 5.99573 16.9927C5.99573 17.2438 6.09547 17.4846 6.27299 17.6621L6.33429 17.7234C6.51183 17.9009 6.75261 18.0006 7.00368 18.0006C7.25474 18.0006 7.49553 17.9009 7.67306 17.7234L8.71959 16.6769ZM11.7196 19.6769C11.8971 19.4993 11.9969 19.2585 11.9969 19.0075C11.9969 18.7564 11.8971 18.5156 11.7196 18.3381L11.6583 18.2768C11.4808 18.0993 11.24 17.9995 10.9889 17.9995C10.7378 17.9995 10.4971 18.0993 10.3195 18.2768L9.27299 19.3233C9.09547 19.5009 8.99573 19.7416 8.99573 19.9927C8.99573 20.2438 9.09547 20.4846 9.27299 20.6621L9.33429 20.7234C9.51183 20.9009 9.75261 21.0006 10.0037 21.0006C10.2547 21.0006 10.4955 20.9009 10.6731 20.7234L11.7196 19.6769ZM14.7229 22.6769C14.9005 22.4993 15.0002 22.2585 15.0002 22.0075C15.0002 21.7564 14.9005 21.5156 14.7229 21.3381L14.6616 21.2768C14.4841 21.0993 14.2433 20.9995 13.9922 20.9995C13.7412 20.9995 13.5004 21.0993 13.3229 21.2768L12.2763 22.3233C12.0988 22.5009 11.9991 22.7416 11.9991 22.9927C11.9991 23.2438 12.0988 23.4846 12.2763 23.6621L12.3376 23.7234C12.5152 23.9009 12.7559 24.0006 13.007 24.0006C13.2581 24.0006 13.4989 23.9009 13.6764 23.7234L14.7229 22.6769ZM17.7229 25.6769C17.9005 25.4993 18.0002 25.2585 18.0002 25.0075C18.0002 24.7564 17.9005 24.5156 17.7229 24.3381L17.6616 24.2768C17.4841 24.0993 17.2433 23.9995 16.9922 23.9995C16.7412 23.9995 16.5004 24.0993 16.3229 24.2768L15.2763 25.3233C15.0988 25.5009 14.9991 25.7416 14.9991 25.9927C14.9991 26.2438 15.0988 26.4846 15.2763 26.6621L15.3376 26.7234C15.5152 26.9009 15.7559 27.0006 16.007 27.0006C16.2581 27.0006 16.4989 26.9009 16.6764 26.7234L17.7229 25.6769Z" fill="#1F1F1F"/>
    </svg>
  `,  styles: ``
})
export class IconObjectiveComponent {

}