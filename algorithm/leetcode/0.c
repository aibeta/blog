#include <stdio.h>
void merge1(int* nums1, int nums1Size, int m, int* nums2, int nums2Size, int n){
  int* p = nums2;
  int i,j;
  int pos = 0;
  int mergedcount = 0;
  for(i = 0; i < nums2Size; i++)
  {
      int number = *p;
      if(number == 0) 
      {
        p++;
        continue;
      }
      
      while((pos < (m + mergedcount)) && (number >= *(nums1 + pos))) pos++;
      printf("pos = %d\n",pos);
      //for(j = m + mergedcount - 1; j <= pos; j--)
          //*(nums1 + j + 1) = *(nums1 + j);
      *(nums1 + pos) = number;
      mergedcount++;
      p++;
  }
}

int main()
{
  int nums1[6] = {1,2,3,0,0,0};
  int nums2[4] = {2,4,0,5};
  merge1(nums1,6,3,nums2,4,3);
  printf("end");
}