
def reverse( x: int) -> int:
    strNbr = str(x)
    if(x>0):
        strNbr = strNbr[::-1]
        while strNbr[0]=='0':
            strNbr= strNbr[1:]
        if(int(strNbr)>2**31-1 ):
            return 0
        return int(strNbr)
    elif(x<0):
        strNbr = strNbr[1::]
        strNbr = strNbr[::-1]
        while strNbr[0]=='0':
            strNbr= strNbr[1:]
        result = int(strNbr) * (-1)
        if( result < 2**31 *(-1) ):
            return 0
        return result
    else:
        return 0
print(reverse(-2147483648))