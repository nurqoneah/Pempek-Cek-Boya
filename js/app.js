// --- STATE MANAGEMENT ---
const LOGO_BASE64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCADGAOEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9y8gfL6jFKCOnoO1M2lufWlZmXjNeEz2BTnHy0Ag/4UEYTikUHA+tLlvuArgccZOKD8nT8aVs9QxwfSkPK8/hQtxWFzkZFJwMnP4+tLt2gc0BflwT+FUMUABenbvSDkcDv6U5AB1qtqeraXoNjLquuanb2drCpaa4upljjjUdWZmIAHuaBWcmkldlnbjBNKU+Xj88V8RftQf8F9v2Df2ebu68N+E/Fd38Qdatsq9r4QjWS2Rxng3bkRMM90L4r4S+NP8Awck/tm/FHUH0X9nr4VaB4St5Di2b7K+p3zdhktiMn2Ef515tbNsDRdua78tT9AyXwt40zuCqQw7p039qo+RW72etvRH7kcZCocnHTvQfk+d8j13cV+BGj+Iv+DhL9sMGbQLj4x/Y7g4V7ZW8O2hU88M32dWX3Gc+tWLz/giZ/wAFifiURf8Aju7d5pDlz4g+JKzOM+uJHrn/ALWrS/h0JP8AD9GfRf8AEK8swl45jneHpS7JqT+d5Rf4H73xvDLny5FbHZWzTiNvJUgepUivwN/4h+/+Coekp9s0vUdA85fui18csj/gSB/OpZP+CfP/AAX6+AMQ1L4f6n8RHhteQvhj4mCZeP8Apj9pBYe20/Sl/amKj8eGkl9/6Cl4Z8NVtMLn+Hk+0rR/Hnf5H72Fsrx81IQQQT09K/AW2/4Kq/8ABaz9knVEtPjUniV4oH2tb/EPwQwSQDqBOY0ZvqHP1NfTX7OP/Bz74J1aaDRv2qPgNdaK5wsmteEpzcwD/aa3lIdR/us30rWnnOElLlneL81b/M87MPCHi3C0fbYRQxMN70pJ/g7N/K5+sIBHHB9qXBxgAD6V5p+zj+2H+zT+1n4YXxX+z98XtH8RQFQZ7a1uQl1bH+7NbviWI9fvKAccE16YV3Dp16V6kZwnHmi7o/NcRhcRgqzpYiDhNbpppr1TGqAc5FIUxy3Sggjg07cDwDVGQmAufSm0rsCcCkLYwSMighrUXp8rDNJkE8UYIPB4NKQQOaC3qBfC4J70Yz8p/SmsSOgpVz15oEkkOynoaKbkeoooGN3n0oALfMaFAyefbFOAwpJPSgBCV64oYgAMDmnZX+7mkIGM4/CgBCwx8vrQp2nqDSEHtwM96cuA27HNKyAGBb5jSrgYNQ6jqOnaNp8+r6texW9rbRNLPPPIFSNFGSzMcAADkk9K/HD/AIKo/wDBdLxb8VNavP2Xv2CdRvo7Ge6ax1Hxppcb/bNTcnYYrAKN6oTx5gG9/wCEAEE8uLxlHCU+ab9F3Pp+FOEs24wx/wBXwUfdjrOb0jBd2/yW7Prn/gol/wAFw/2bf2Jjd/D3wU8Xjr4gxExvoem3I+y6c/TN3OMhSM/6pQX4wdvWvy71Px9/wVV/4LW+P59I0WDV9T0KO7w+naeWsfD+lZOf3rsQjMByd5eQgcDoK+mP+Cbn/BvHP4qh0/45/t9C9hS623dp4BjuCs8hb5t1/L95CepiUhs/eYHK1+t/w/8Ah54F+FPhOz8CfDTwbp2haNYRiOz0zSrNIIYl9lUAZ9SeT3rzfq+NzJKWIfJD+VfqfpMuIeDvDm+HySlHF4uOkq89Yxf91dbeXzkz80f2Vf8Ag2b+DnhK2t9e/a2+Jl94p1EgNNoXht2s7FD3QzH97KO2V8vPpX6AfA79j/8AZh/Zu0yLSvgf8DfDfh0RKB9pstMT7Q59XmYGRj7k16QUBOBjjtigZ5U16dDB4XDr93BLz6/ez80z3jTifiObeOxMpJ/ZTtH/AMBWghJzjdQwUHjtQTjgDp3NH3ucV02Pl3cTYjDLLmgqFHTB+lL8ufmBB9AaXaSfm5pWaegvQratpGka7p76VrmmW97ayrtktrqFZI2X0KsCCK+Vv2l/+CKf/BP79piOe+vfg/D4S1qYEjW/BpFk+7+88QBik59Uz6EV9ZFDnikU+tRVpU6seWcU/VHqZbm+a5PVVXBV505f3ZNffbR/O5+E/wC0x/wQm/bi/Yp8R/8AC6f2PvHV/wCL9P0tzPBd+G5ns9bsgpzzCrfvgMdYmYn+4BXpX7Bn/BxN498EazbfB3/goD4fuLqCCb7JJ40srHy72ydTtP2y2AHmbT95kAcY5Vq/Y8DOAnbofSvlX9v7/gkZ+zH+3XpF1r+o6FD4Y8deT/oXjHR7ZVlkcD5VuoxgXCdjn5wPusK8meW1sNJ1MFKz6xezP1PA+ImVcSUY4Di+gqkdlXgrVIeem672+cWfRvw1+J3w9+MngrT/AIi/C7xhp+u6HqcPm2Oo6bcCWKVfqOhB4KnkEYIBrbBIYgdq/ny8MfEr/goL/wAEG/2jm8E+I9PkuPC+oXPmyaXO7y6N4htwcGa3kx+6m2jGQA6nAdSOv7W/sU/tsfBT9uj4O23xa+D+sZIxFrWi3TqLvSrnHMMyg8equPlccjuB04LMIYl+zmuWa3X+R83xfwHieHKccdhKixGCqfBVj57KSWz/AAb89D2BnHGetAywyORSZ3AMhGPWlA54616PMj8/uhSgGBmgjAwG605wCKZxg+tMYAlsEnFLle1IABwtORQFIxRYCLY3pRT6Kn3hcyA4YZA4zSgAKSRRkU3BJzu/CqGOD5XGO1NJwaUKFJz+NJgE5Bz9aADGTmld440Ms0gVQOWJxijJx83Ar82f+C/n/BSa5+Afw8H7JHwf14weLvFmn7/EN9by4k0vTHyuwEH5ZJhkD0jBP8QrDFYinhaLqT2X4nucN8P4/ifOaWX4Ve9N6vpFdZPyS/HQ+ef+Cxn/AAVY8bftU/EOX9hz9jy7urrw8+orp2r3+jEvN4kvC+37NDs624fC8f6wgnO0DP1v/wAEiP8AgjX4R/Y08O2Xxt+PGmWWs/FG9g8yNWUSweHlYf6qEnh5scPLgYOVXjJPA/8ABBD/AIJZ2fwV8F2n7ZXx08Pq3i/XrTf4R067h50eyccTkNyJ5V5B6qhx1Y1+mxOBkn9K87A4SpVn9axKvJ/Cv5V0+Z+hcbcU4HJcH/qvw/LloU9Ks1vVn9rXt377L3UORAeDx+tePeM/+CgX7D/w/wDG03w88b/tbfDnSdatpjDcabfeMbOOWKQHBRwZPkYHIKnBHcV6/ggZHWvgf/grT/wQu/ZM/b58Ea58U9G0Gx8DfFCxspry18Z6Tp3yX7IpcxX0EY/0lWx99R5wP3S33T7lJU3O0z8aqOoo3ifb3gn4k/Dv4jaSNe+HvjzRdesT0vNE1WG7i/77iZh3HetknoyngjrX8pmm/taf8Mn+JrH4baakk+v6JF9n1jxr8NNTGgatp91G+F8i7s2Nnq9u0eyQC6tgw3FG2MC1fpF+xd/wcNeMfAng6DVv2nNXh+KPgGx8mPWPHeiafHp3ifwyHYIp1fSC2y4jyQBdWjMjd/mwtdE8K/sGMMRf4j9kclRgjmjaSMkY9MV+WnxP/wCDhT4w+GfivqXhj4DfsP3Xxm8JSQNd6B4z8A32oQQGF2PlxXYvLFUhmAA3hHZRkEHqB8k/ta/8HDn/AAVS1WC80nwzbfCP4NRMrhbSz1OLxDrmNv3PlaeOJu3zpHg/SoWFqN6sp4iHQ/fu71Cz0+Fri8u44o0GZJZXCqo9yeB+NfNP7Q//AAWY/wCCZX7LeoXWgfFj9rnwtHq1rCJJdG0S6bUrnltoXbahxv77SQR3FfzGfFn9sv8Aa+/aB86//aK/ac8ZeM5Z5ARZah4gnWzBJCgCBGWMAEjotYHw2+AnhS58I+Kfi/4x1qTStA8NwxRSXsNsjz6lqt15n2SwgDYRC4imldzxHDA7YZtqnaOFp31dzJ4ib6H9Q/gb/gtl/wAEuPH3wyPxXsf2xvCWn6bHcC3ng1ud7K8jkxnBtpUWYjHO4KRx1rlp/wDgv1/wTDuNRl0zwt8bNU8RPEMk+F/BWq6gpHqDHb4r+bH9njxj4t0bxGbj4U/Dex8TeISoSC7m8IDXJbY4/wCWFu6SRoefvNGzfSvqLTv2cf8Agu38fLcx+HPhR8dGsJEGFkkbQrLb7Rb7aNVx/s9Kt4WknexP1ipbRn6/65/wcr/8EwPDd5NpOreKPH0E8BxJFP8ADi8idTjPKysrDt1FVdH/AODnT/gktqNwLa7+LviXTSzhTJqnge9jQe5ZFkwPevyDuv8Agk38Xfid8M9N8UeE/ib4Ye+OtT2PiXx5438efZdJur2JAJdP0tRHLLfi3c7ZbvOxpAY4htQs3pnwf/4NbP2nfjZpH9t6d+1t8LolXHnNY2+pXaqT6N5MYbp24pSo0UtVYFVq30Z+iX7TX/BZf/gg9+1v4Uv/ANnf43/tE6RrGl3eBHe/2Ff4s5cfLPBcC3/duufvDjscjIr5w/Yd/Z6+Hn7N/wAak+P37Df/AAV4+DeraTLevanRPFd9Jpiava53/Yrku23zApU7lXKsQwHOD4h8VP8Ag2s8OfsaaPo938b/ANvHQl1XxFfNa6Donhz4bajqurazcBS7pbW0U/mSbV5JACqMZIzWf8LP+CFfw3/aq8cRfAvwx/wUJl0fxRYWr6ra/D/4ifCjUtHupoTtV7qCCW5KTqQqhnjLEBQGwAK5auVYKvNVGtV1Tsz6fKeNeIMlwNXA0KidGr8UJJSi/Oz2fmrdOqP6HPCfjbwv4w0W11TR/E+j3xuIBI39karHdxA4G4I6H51BON2BnjgVqg7+UOQehr+d/wCIn/Bvz+0/+xb8ZfAI8J/8FDvhzoOr+JdUax8M6dHrOsaBdanMWjHkQiDzHbJdQSpUDIJ4FfUGhfCr/g6Q/YhtLzxNafFr4ZfE3whpoM8+h+NvFkdy8Nuo5H2y4itplAH8TS+5raWFT2kfOLE66o/YEkgYJ4poByTmvk7/AIJHf8FJvE//AAUl+D3iTxr4y+Bs3g3VfCXiJtF1Gay1Rb/SdTmVcvJZXSgCVFYEHG4DK4dgc19Z7tvAH1rjlFwlys64SU9UDADjNHPQUjc5xQMEHB5HakWFFJlv7v60UGYcD7zUucnBxTCNvIbPrThgDI59qT2NB24lunamtgDOKjuL6xtpUgub6GOSUExRvMqswHXAJycZHT1qUAsceWcjqCORTUWkQ5LZM4P9pn4+eDP2YPgR4l+Ovj67WPTvDmlyXTxZAa4kxiKFf9p3KoB/te1fiV/wTB/Zx8af8FUv+ChGtftJ/Hq0k1Hw9pOq/wBveKXuAWiuZ2f/AETT1zxsG1Rt7RxEdxXu/wDwczftW6hLf+Dv2MfCF3IVkUeIPE6wtzIxZorSA/iJZMd8p6V9yf8ABJv9j2y/Yx/Yv8MeA7vT0TxHrNuuteLLgph3vLhQ3lH2ij2RD/cPrXi1V9fzFU/sU9X5s/a8pqLgXw8qZjHTF473Kb6wpq92vXe/nHsfS0KLFGscUaqFXCqowAB0AHYCnBSx+amiaJRudhgdyah1bxFoHhzR7rxJ4j1m0sNOsoHnvL+9uViht4lG5neRiFVQBksSABzmvbjFzeh+JylyvUssdgJJrxn9uv8Aav8AhL+yL+zn4t+JvxL+ImkaHND4dvf7Dh1HWYrSW+vPIcQxQFwSzmQrghWwcEivzo/4Kh/8HKk3w/1m8+C37BXhiK61BbcGb4j+JdPf7KFcEpLYWrhftSkfMs8n7puCquMGvxr+L3xO+Kv7Q3ie7+Jfx3+JWteMPEFw5e41jxHftcSICeiBvlhQdkjCqOOK6qeFaleZzVMRdNRPNNE1qbxZcvrd/ctNd3Vw8t5LMPneZmLOze5Ykk985r1j4JfG/wAffs+63deL/he2j2msXVsIF1XUvDtpqM9qmck2/wBrSRIGJxl1Qt8oAYAVh/s+/sdftX/tX+JVX9lv4L+IvEc8tz9mhbTdFkktGw20vPcMBDEAehLZA5PpX238Mf8Aghj4X+HPj3TdF/4Kd/tsaH4X/tiWH/hG/h98JS+r6zrikKGK+RHI0aCUmLdsbLRtggc137K7OSx8W/FX44ftFftBa6o+Lnxy8ZeL7m7kC2+nanr1zchyTwkdsjbOv8Kx49q+gf2af+CG3/BTH9p3Tra98J/s4T+FNEugpi1rx1KukwspJ+dYmDTuOO0Qr9t/A2l/8ESv+CMvwnsNdvdK8HfDi9mshKk3iOP7V4quz6usnmXRc8HaAFHoOg4G+/4OKfg14+129tf2Uf2V/i38Z4UlAsZ/BXgy5S3wBlvNuZ0CLg8YCkjByazqSmopxRUFG/vH5eftjf8ABvj+0B+xRpHwy1HxF4+l+I+tePfE39lXXhj4eeFbl308R+XcM6SszNJ8iOCzIirwe1fqPp3/AAQc+Dnh3xvovw8+C3w00DQvhx4dv5tZ1C48fXsviiXxPqslkLa3mlsJTHHCLRZbnaGcqzODswK4fxZ/wcBftU6PcRNq3/BO3w/4YCEm3g8d/HLRtMuVzx80crKwP1FbPwZ/4L3fHLx54lj0LU/2KfCOqXErgJY+DP2hPDl7dyHOMJE8qlznoAeahusoruXH2Sep9h/CT9grwL8KLuwvo/ib4mu2sZVlgsNJNroOmq6tuA+y6XDAHTtskZwQcEHNecf8Fr/ij468I/sj2PwN+Emuy6d41+OXjbTPh54Xv4H2yWp1ByLq4BHK+XaJcHcMEZHSul8Cf8FONJ1bx5oPw2+Nn7H/AMZvhlqfiHU4dN0u68TeCzc6dLdysFjja8snljjyxxubauOpFeB/8FYvG91D/wAFUf2CfBWrSf8AEpufiL4gu2jf7jXiWVvHAx/2lMrY/wB6sbT9qnLfoa3j7P3D7a+BXwC+Gn7PXwg8MfBL4beHYLXQfCWkQ6dpETwqWWONQu/OPvuQXZurMxJrt0jhVQu3P1ohTbGCzjpyKcq5Gfxribk35nSkuh+VP/BeKw+IXhz41X3iO48R/wDCKaX46+Bdx4O8D/Ee9aSOw8Oa3/ayXd3a3FwgP2IX1mogFxwBsIJxnHyL/wAEfv2dvj7rX7RXwf8AhPb/ABS0zxdfeB/is/jO8vvCmrf2tYeCdAWwkgurR9RUsm7UJmgUWiOwUWxkIBc1/QH4h8P6F4q0mbQfEui2moWNwu24s7+2SaKVfRkcEMPqDVXwj4W+HHwl8OS6b4O8JaL4c0yFWmmh0vT4bO3jAGS5WNVXpkkkV2U8UuTke5zTw8ubmRzH7S/xi+Av7PXwxvv2gP2hL7RtN0PwZA9+dY1W1jkeyfbj9wWBYSucIAnzMWAFfiB+3n/wVQ+H/wC3p8Z/D3w7/am+M1/4R+D1zd29+vwi8JXbi/v9PBDifXby3SUpJImGTToEdgHXe8ZG+vvb9o39hq7/AOC7DWXi34q/EzxV4Q+A2ia5v8EeHNGiSCfxoiZWXVp2kUmK3kbK2uF3eUDNgeauPW7T9ln/AIJT/wDBH39n7UvjEvwV8E+CtC8N2oe98Tahpy3upXEnCov2iffNPNI3CopyxPAHONKMeT4tyajcttjwX4bf8F5v2AfghP8ADv8AZ2+FX7I/xX8KeDdd1qz8N+DL1Ph6unaZvkdEQRRySiSbHmKzFVLfNuOSef0kcbWKE8hiDX5X/wDBPzwJ8W/+Cuv7bmmf8FbP2gPBV54c+FPgJJbP9nfwXqfzSXDb2DavKDwTuywYcF9oUlYgW/U/GAPpXPieRT036muH5+XXYd0T60hVRggHmgKTyBQOeMc+9czvc6xKKdsPqKKZmRuO+aVMj6Ujbjxt6GnbcAA+lBozwv8A4KH/ALBHws/4KHfs76j8GfHtxPpmpxRvceFPFFhIUutFvdvyyoVILISFDx5AdRjqAR+IHwd/4KT/APBWj/giR8Yrv4L/ALUZ1H4heANA146NqOi+INTa5Ma7BJDNY3b5lgEsLLLEr7o3AZcAo+3+jVdo+UMcV8Of8Fuf2KND+PX7Peo/Gaw8Ly6ldeHdGlt/Fuk2luGl1fQN4lmEQ/5+7R1+12zdVdJU+7O4PXh6qvySRxVqbXvxMP4W+Bv+CV//AAW2vvDv7Znw4uJT4t8Pajp8/iTThcCK+hMBDLY6haMWUxnbgSrwwHyuelfdPxF8d+AfhL4C1D4k/ErxXYaBoGkW5n1LVtSnEVvaxggFnbooyQM+9fyTeD/ir8e/+CZX7Sll8SfgZ8RltNa0uOG80jWdPfdYeI9HuF8yF3jJxLbTxYJjblGDL8rx8fpB+0V/wc/D9rn9mq0/Zl/Z2/Y/ufEPjrx/4el0fxRpeqwNqFrHcTI0UkNlawbpb3I+dd20KGXdnaar6lShVcoq19/M7K+c5ji8PSoV6spRpK0E3dRTeqXbofVv/BSL/gqB+yl8d/2dfEHwH/Yv/br1E/FS+8ufww3wfimvr8TQv5mySVCkUFu+3ZJK8gVFJJ6Yr8qG/b38YeDlk+HH7ZP7a/jf47a9cRZ1Hwvoc/8Abmg6S8a79pWXFvqt2rcKHV7KI5dxclQhx/2VP+CPX7Yfxx1u/wDhN4i8U3fhe2Ji/wCEn8H+Eol1LWtqgbUvkgcQWQHUJezxAHny2PX9of8Agk9/wR5+Dv7At3qPjW0/Z9sdO1u60lbKDxL4i8SjWdZmBbMn+qjW1tImAA8uHLEr8zEdd4qlh4O2x5t51pn5A+G/2Af20/8Agol4w1P9tb4seG9I+Bnwpv0gA8cfFjxFIN9pEojSUeeRNeSso3ZURRE4WNUQKo+0/gB/wSl/Zkt/hLqsf7I37MXiX4+eLrnQrtdN+LnxVJ0Lwra3jW8ixy2FpKu672uVKMIpBkKTKOo/U7w3+yn8JEswvxI0R/HV0usrqqX3jrbqZgvEQpHJBHKvk22xWKosSIFB455r1B2jjhWCBFVVUBVUcKB0A/z2rL65Bq6Rp9VknqfEvwD/AOCZ3xJ8SfskeDPgn+0F+0F408KeHrHwxp1rP8LfhxNb6HZ2wSFfPt7u5hV7m7eR9/mOJUBJOB3r6P8A2dv2R/2cP2UfDS+EP2efg5ofhWyXmQ6ZZgTTHABaSZsyyMcclmOevUkn0hST19OtO4H+Nck61So97HRCnTgtj5M/bo/4Iu/sB/t3DVfFXxO+BlhB411ANJ/wl+jXUlhfTTbFVTPLED5y/Kow6tgDivgq5/4NtP21P2etCstZ/ZH/AGvrHXLCxSZo/hF8VUe+0Ri4fcp2bbeUkncrPAhBIJOQSf2pVepAz9aMnJyc89zWlPEThvqZzoRkfz0+PfHf7RX7GkmleAP2yv2IPHfgy/urzydR8W+DZdB0PwdGSxAljn0/RZ5I4wMZ3yM3Wvrn9ijxt+yd8O9Ssf2hf2hfjx8O4vCkdo0ukS33x0svFX2q5bARRZtpcUisMlgUIcMANvNfqpqOk6drNrJp2q2EFzbTIUmguIlkSRT1VlYEEc9CMV5H8P8A/gnh+wr8I/idffGf4Zfsj/D7Q/FWoy+Zca5p3hi3ScNnlo/lxCT3MYU1v9ahJe8jL6vNPRnd/Cj4y+FPjp8PdP8AiV8Pf7TGkaqrNYyanpU9hNNGrFA5hnRHCttypZRlSCODXwx/wcSfC7xdoXwA+F37evw70Zr3Wv2cvirp/iu5t0BJl0t5Eju045xuS3JPZVav0LSJd2R+Jqp458KeF/iD4K1TwB430C11XR9Z0+ax1XTb2EPFdW8qFJInU9VZWIP1rlp1FGpzyOmpC9PlSPNfEf7Unw/h+A+h/td+C0vNe8F6jptlf3l1pkwb7NpNxtZr8xYO/wCzqweRQQyxrMeSm0+o6PrOna1YQarpN9Fc2t1EsttcQOGSWNgGV1YcMCCCCOCDX5d/DO4/aD/4IK+JdT+E/wASfBviD4k/sf6jezXHh7xVpVk2oaj8OFmfL2t9CAXksdzH5+QNxIwSy19hfsYW/wAJvEOjwfEf9if9orSvFHwj1WR57fwzZSLf22kSvljFZTK4kskLkk2kgKIchBGMrWk6aqLmRnCfK+Vn0cYmblRWL400Xw54h8M6h4f8Z2Ftd6Te2UtvqdregGGW3dCsiSZ42lSQc8YJrwr9pX9oH/goR4KvtZtvgh+yz4AtvD2mByvxA+InxQis7DygARO1vDEZFXn7rOp96/H/APa0/wCChvxr/ai+KVr+z7pHxruf2mvHmqXZj0r4YfCGzuNN8CWbg8m6eJhc61t53BnW3AB3uRkU1g+eKd7A8TyuyR+r3xx/4LJ/8E+P2Rfh5qmt+IvijbyaR4ct1stOTw5Zie3v7lAVGnWLKQk8kYQbxGTHCuN7KeK+E/GXgf46/wDBWvTLv/gpb/wUh8A6/wCEv2YfhrbPrPgD4J6crNfeJVQYF5d4x8j5+aQ4+TITam539E/4J7/8G/8A4kvviDpv7Yn/AAVa8R2Pj7x5AkLeG/h3brGdB8MxR48mAQRqsDCNQu23iUQJjOJDk1+lPxq8EWnxG+B/ir4ZXcAMGt+G7zTzEFwCJYGQDHTuPypzqKhBxp6ys9fyN8BSpVcZTeIX7vmXMlp7t9dfQ+Z/+CNf7cM37bHwL8R6lqHhvTdBk8L+KJNP03w/pNusUGmaUY0axt0C4BEcQ8vdgZ2dB0r7BK7jkZ4r8Xv+DZn4h3nhf9pb4mfA++dgup+HEuliY8CezufLfj1KzfpX7SZOOK8XLa88Tg4znv19T7vxGyPC8P8AF1bC4aKjTtGUUtrSin+YnzADB/TpRyRxg+9IDnOB9aBwNo/Cu8+Hdxf3lFGH9/zooJuxApJ+Zu3rQVIoIJbJH5U0sAcflQW9QJOTx371meML8WHhPU78+HbjVhBYTSHSrSFZJb3bGx8lFYhWZ8bQCQCSATWmWBOKCoAzj8KcXaSM5LQ/lW/aY8KfB/wb8UdW+F/7e3wa+KvgKTT7jVb3wN8LfDEeku+g6bqEzTwRTX81wZpYlmLSrbFAq7mCsA5NfQX/AATb8Yf8EavhP8Pdc8d2Hgv4/W2saZBDZ634t8V6Jc3vh+BXyUjuodEmVRCWUkpKcMAc5FZf/Bwp4Z0e5/be+JnxQ1C2RrybxL4b8PaXgZZUtdBN3df99farUf8AAa/QD/gjJ+w78P8AVv2U/jZ8O9Dl1HwtYeJTpXgzVta0F0S8ubuz0W3GqzpI6uAz3d3dRZ2nbsOOQK9ZySp3Z5sU3KyPpP8AZi/4Kaf8E4B8OtB8Jfs1ePvCmr6ULQC4tfhvp0aR2c6hQ5bTgVukB658p+AASTX0J4H+PXwj+Ld49h4D+IGmajcou6bT1n2XUQP9+CQLKh9ior87fFn/AAa+/sMeJvBVz4bn8QeITqNj4YOj+DNXto7Sym0XDF47iVrSKM38wYgGSfLFBjg8j5h/4J6/sO/8Fn/CGna74Ek+LHiGw8S+DPEN9p2i6X8W9ITWfD2tW1u+BJbT7mvtOR9oCTriJ84VwwK1z/ucRGyZsuejLY/dlo9gIIPuO9NK/L069eK/MO7/AOCl/wDwUD/Yw2237e37DHxD0LSLc7ZvHHwxdPF/h1wON7RMftFspwfl87IHY9K+gf2X/wDgtf8A8E+f2lmi0fwz+074Pi1lwQNH1e/bR7yRx/AINREWW7YR257mueeFnH4dTaNeL+I+vVXaOBS7eMZB/GuB8Q/tQfAHwhPYW3i/4o6ZpTanaJc2bahIUikRsjiUAxkgggqGyK6Pwv8AFD4Z+OAq+CviLoGrM4+VNN1mCdj/AMBRyf0rN05pao0U4N6M2yTwPSk254BwTQZIoyTJIFAHJcgAfUnpXM+MPjb8Fvh1byXnj/4v+FtFjiGZG1PxDbQ7R9GcGlGM5bIHKMd2dNg5xigFm4PWvAdU/wCCnn7HzaidE+HnjLXfH+obCy2fw38E6nrxOP8AppaW7xL+LgDvivJfjN/wWi+HHwR1Kyufih8P9P8AAegPMjahffEvx9pmn6ilsGHmGDSLWS5vpZdudsbRxknAJHWtVh6r6Gbr011PtclE5L8nGK574kfFX4bfCnRH8R/Efxvp2jWiXFvbl725Cs007iOCNU+87yOQqKoJY8AV+Qnx0/4KEf8ABRz9vnwa3xH+CHxFb4D/AAn1m2Op6FqkECRXa+HEu2gk1jVtWuP3Gno4in8q2g33EjLhUI+evnnWW/aa1D9ob4c/Fr9hD9nq51jwRqfixbH4LeMPjP4jkuNT8d+JirRt4kkhnfz7qC2gWd4gVWC3RjJyz7W2jhLxtNkPEO/uo/oN8a3j6L4L1a+MWlMYbFyRrt15FkcDpPJtbZGehO08dq/BT9rz9tb9h/4ZftAQ+Gfgl+yL4a1b4oarcyrf3f7KPxm1mz3TqQAJha2UccrOWOAiyHg5Ir7Ki/4Iiftm/tqW8Wt/8FZf+CkPirxTpzyCST4a/Dhv7L0gHg7JH2rvHGP9V9G719jfsh/8E4/2Lv2GdFGl/sy/AHQfDlw8ey51hLXztQuB/wBNLqTdKw9gwXPahSpYZct7kuNSs72sfjz8N/8AgiF/wU9/4Ke+Nf8AhZH7X/xL8ZfCX4X3EyPpvgzxp44vPEGseQAM4hnYKhYgtun2kbuEPSv15/YP/wCCaX7Jf/BOf4fDwV+zj8OLe0vLiJV1nxPf4n1TUyB1muCAdueka7UHZa99UIp2KOKTCj5s5z2zWFTESnotEbRoxi7vUUlivX8BTWUNg4GMjP505fUCkkyFyD34rHdo1V7n4Y/8EnrW4+F//BcnxH4B02b/AEdta8V6fIAMZjR5XUfnGv5V+5w5+bv7V+HP7Bt2mqf8HD3iS7sm2xnx74rYBe6hLriv3HJ2qCR+VePk2mGkunNL9D9b8YJe0zzCVWvelhqTfr7w0gEk8CnYXHGPamBd3B6U8LjjsOlewfkrdxP3lFOooEMGeSPXimttxzTiWB+Xpjmkwp+lBoMAOcjpmlYkhueMUY+bg8UT7o7dygydhwB9KOtyWfzhf8Fer+9+Kn/BZvxF+z7qawroWm/Eqx1nUrlnIK240DTDdlu21baxkI9dzV+2X/BJX4eah8Of+Cfvw/8A7ctXh1bxVZ3Pi3XA/wB77Xq91LqDg/QXCr9FAr8WPjNoGqftd/8ABwX8WPgt4Q0y7mn8X+NZPDVzf2o3Cw0+GK2h1Kc46EWltcRL2zcYOO/9FHhnT9L0nw7YadounPZWkFlFHa2UkexoIlQBIyo+6VAAx2xiu/FNqmkjhw8bzbLZUZ3GnJhWMgHJ4Jpdxz92kXIJLZxXAtNjsbvuODRyKwljBDLhw3Rh6H/Pevj79tr/AIIhfsQ/t4+Kbnxt8YNE1qLVf7LNrpTaLfRWcGnvtP75Yooh5rs20t5pfO3A219fgkNkcg1Dqh1eDRr268P2sM1/HayvYwTy+XHLMEJRHYA7VLAAnBwCeK1pylzbmdSMXE/lM8M/BD9oj9n/APaL+IfwG+Fn7WPifQLTwH4yudEt7/TtbubO1nhtZj9ovrsRzBbW1igG53AZjJJFFGrM3y/qZ+yp+w5/wU5+PnhqX47fAz/goF43+C/hS7dIfBOk+OPD8WuarqtrGgDarcNcgSWaXLkvFbkuyR7dxGRn1X/gm1/wRR1D4aaxq3x1/b+8R6X4w8ZeJfFdx4km8IaVCp0ewvppzMJZ5NofUZI2OYxJ+5iPKoW+cfoybJEIECKqqPlA6CuqriHFJU9TnhRTd5aH5saj/wAE6/8Agv8ATs8Fl/wW00W4tWypF38MIAWHuBARXP6j/wAEdf8AgsR4+zD49/4LMWECnh7jQvhZbwzAezIkR/8AHq/UkySQAKc5Ipscrk9CPTIxWH1qcXayNPq8Wr3Py+0z/g3L+KHjCAWX7R3/AAVw+Oni20Iw9lZag1lCw7jDTy4HsBUf7QP/AAQW/wCCdH7Hf7H/AMTPit8Lv2dNW+IPxAsPBl83h288T3c+sXcmpPCY4DFboFR3810IBjbBFfp7rHirwrpLLb6v4o062laRY1iub6NGZycBQCQSSeMda8/+K37U37NXwV1OTQ/i78fPCHhe9SFZXtNd8Q29rMsbZ2vsdw204ODjnFOeIrxloONGlJbn5u/8E/8A/gkB+07+1J8KPhbb/wDBUG/bw98MvhnoVjaeBf2e9JvWEMzwICb7WHQ/PLJJlzCCcbtpKAEH6T/Y8/Yn/ab8Xftcaj+3J+3Hpfh/Q7rwhY3vhb4H/DXwxKktj4Z0ZpNr3runytcTxIqDGNqZBAyoX6G+CH7aH7H/AMe/E58H/BD9p3wR4p1dYy50zQvEUE85QckrGG3MABzjOK4n9qv/AIK5fsF/sc+P7j4R/H/4salpHiS3tYrkaTB4R1G5kmikHySRPFAySA4IyCRkEdqvnrVIaqxm40oSTTPobezAKXzj3p46dfxr5V/Y1/4K4/sq/t4fF3WPg98AYPFzajo+htqrz+IfDMmnQXMCzJCREZTuYhpEz8vAOc9jzf7PP/BZv4Y/Hb9sbxD+xnd/BDX/AAlq/hCLVpfFGteJNYs1tbJNOwJyPKZ/M5ZWByBty2eOeaNGs3ax0utSWzPs0AfephKgnP4V8k/8E9P+CknxK/4KHePfFuueAf2fdP0f4TeGNXudMsPiBceIJ5ZPENwjkIbOA26AJt2u7M3y7woycgfW31pTg6bsyoSVRXHJ0pJ5YLeIz3MoSNBud2OAoHU/lQo5zke9eY/ts/FO2+C/7J/xA+Jst15T6T4VvJbfHWSdo2jhQcdTI6Ad8kVnOapxcnsv+HOnCYapi8XTw8N5yUV83Y/IH/gifbP8Vv8AgsL4o+JgcTeQPEurPKOQPOnMat+Pm1+5oyOM1+av/BDX/gnX8TP2RfjJ8SfHHxWh82S48P6RZ6LqH2SSJbhbmJb2fbv67CUjYj+JGr9KTySc152U0alHB2mrNtv8bH6F4rZpg804rvhJqdOFOnBNbaRv+v3jgCw5JpCffH1pNxPBNJlQMNn2NemfmzHZHq1FJt/2h+dFBI3k9+hpRnvSK4BwDk05RuJ3NQaDQfl25FR391LZadPexWUly8MRkS3hIDylRkIu4gZOMDJA55p5UKMjPFOLAkEjFEZWd0TJXVj4H/4JA/8ABKfxD+yr458e/tsftNCC7+MHxU1q/vbixhnWaLw5YXN09x9lVxkPO5KGVxkAIqAnDE/e6hs4NOVfmwWz9BTvLG4svpV1JyqSuzKEFBWSEUgDkUp+YEj0o2jvz9aUDHAqCxpJRSwUkdcV+UnxE/4Ku/8ABUfx3/wUa8Y/8E5P2avD3wettd0PUb9NJ1PxHpd8kd3bW8CXALt9ocLIY3HG3bkHkCv1giiSVwrY54r8HP2uPDHxT0//AIOQtc8Nfs+fHPT/AIbeK/FckUGmeLrvT4L1LF7vRAr5hmIQu/lFFzkhmUgE4FdeGVrto5q7btZn1b/wSn/4LJfHz9oL9r3Xf2CP21/hzomj+O7A6jDYat4ZhaKNbyxz9otpo2eRc+WC8cqthtuCo3A14Hpn7bP7d3xf/bV+K37MnxM/4K3W3wS0DwDf38eneJNW8NaUEvVhvTAkHz+T+88vD5ViTj7vevrf/gmn/wAEWPCX7D3xi1v9qn4s/GbU/iX8TtbS4X+3dQsvs8Vi1yxa5ljTe7STy/daR24UlVUZJr4Z8Z/DF/Bv/BYn4y/FD4k/8E7vG3xu8B3mtapFY6VpfgyS4guLuaO1ZJUkmVYwEkE6F1J6nGcmtIVKDk4ozlGpGK5j9Cf2ZPhP8W/Ev/BNfx2PG37cGufGeHxfpWqaz4I+JMEdzo+oLbm2/chPLkDQ7J4HZNjYKsMjnFflP/wSO/4KU/Hv9jL9oPwZ8Sf2tPif4o1j4bfFnw7LHcah4k1+4v442hnmhS6QzSP5bR3MMkUijBCSgkfdr9c/2A/jJ8TfF/wD8afDTVf+Cd/iP4G+C/B2gJY+AvDmqSS3N5qUc0d08yRKwHyo3lhVBODJjIGK/Pr4bf8ABEv9qb9oj/glF/wzn8RfhHN4K+KfgD4kahq/gO68QahbG2v9IvxD51qXgkkMZDK0mGAw6pjO44a9mm72E1PS1z5X/Zy+KnxC8e/8FUfgh+158cY4Gt/jF8WLfxXZW1yfMjt7K51u4so0IcYHlNHhSM8Irda+yP8Ag6J8EaNo3xy+BnxK1XRLW4ie1vrbUvPgDC4hgu7SQxyE/eXbI4wezH1ruv24f+CGv7RXj3xh+z1bfsn3fg3StK+B3gLTdHfUvEWrTwPql1a3UdxvWGC3kK7pEkdmZuTcHAG3n6U/4Kv/APBLv4g/8FRfC3w/0aL4laJ4MfwvHez6nPJZS3ztLdJCrRRYMYKKYydzYJ4+UVScWwUai3R+Zv7TXgj4O/tN/wDBTTwIf+CM3wX1DRk0abTpdQ1Xw9oc+mWNvfw3u978KwUW0McO0OxCCTG0KxPzei/8HGd74v8Ah9/wUx+Afxc8G21jNqsWmWMulxaop+yTXVrrG6NJ8HPlEzIHH91jX7P/AAy8J6l4J+HukeHvE0+mz6xBpsEWrXulWRt4bq4SNUaUISzDcRnBYkE9eK+Zf+Ci3/BH74Vf8FIviF4S8dfFj4z+LPDtt4P02e20+x8JxWkbu80ySvK000UhzmKMKABt2k9Txm6q9o+xoqT5L21Nf9gcftoeHda8V3//AAUYg+Hmla1qmtWtp8OY/CT20dvJE1tI1xa2+f35cmHeyuSSFJHyrx+On7Z/7N3xn+MX/BcT4wfs1fALxNFouseN768ZZLm4aKK7tp9LjvZbZioJ2zGPyyP9rnjNfqZ8Bf8Agjn+xb+zT+0D4W+P0P7Q3xM8R+LvCd/Ld6P/AMJv8SorqMTyW8tu7NB5KbiY55B1B5617Wv/AATO/Yu1z9pgftmap8IVvviK2ox30Piu48Q6g0kUscYjj8uNbgQqixjaFCbduQQcmpjiKc5+7qXLDV6cFKpG1+58Qf8ABu3/AMFFtL1HwU3/AATc+Pun2fhXxz4CluLfwxbXMKWr6lbJIxmtJEwB9rgkL7v4pUO7llcn9UsbmIwMV8k/Fj4kf8EX/APxe1H4nfEHW/g3a+OP7W+06jrFxDZy6gL2Mgb2cKziRSg5+9letezfs2/tl/s2/ta3Ws237PfxTs/FDaAsB1aSxhkCQecZBH8zKAxPltwCenvXHWxGGqV1CEk5drnq08lzijgniamHmqat7zi+XXRa2sepIhzj1ri/i/8ADX4c/HC1j+FfxJ8PXGpafbXNnq89oxdLaV4Zy0KSlSBIPMj3GM5B8sFuoB8y/bn/AOCknwN/4J8JoNx8a/DHie8TxH540yTQbCKVGeLbvRmklTa2GB+n5V6D+y5+0TbftZ/Auw+O/hz4ba14d07WleTQ7TxE0SzXVuOEuCImYIjnO3kkjnHIznGpRqzdKMlzb2On+y84wWBp5pKlKNGbtCpok5LT3db3Vuh34CBAAMYGAPSmN97bj86/LD9q/wD4OGfiv+zV8QdQ+GUn7MPhWfV9K1S70/UYD43kuGtZreUxsJEjgUruxuX1Ug+oH1H/AMEp/wDgoxqP/BQf4X6z4j8a6FoOj+ItIvEkk0vQL1polspgRCzbyWWQMkqMDjlQQMMK5qOY4bEV/ZRfvHu5nwDxNlWULNcTSSou2qkn8Wz0b08/NH1aAemPypeTjijaynv1pxA242niu0+M2DB9FoplFAhvO0Y605eecY+tIAo6GlOB1IoNGHAOM9BTbie3s4Hu7y5jhijUtJLK4VUA7knoKi1PU7HRdMn1jU7qOC2tYXmuJ5WwscaglmJ7AAEk+1fz+f8ABSL/AILO+P8A9rL413fhLw/ZuPhLol3LDp3hdL+e2j15lOBc3zQskkkbEEiEMoCkc7sseLHY6lgaalPd7LufYcGcFZpxrjZUsN7sIK85PouiSurt9FdLuz9jviR/wVD/AOCfXwr1pvD/AIy/a28Fw3sUhSa3tdWW6aJh1VvJDBT7Gr3hD9pj4Rfte6poK/sk/tpeF3n0bWI7zxBpGlpbX8up2ABEls8UjLLADnIlXlTjII4r86/2W/8AgmB+1d+2n+zvYfETxbe/Cn4ReH9dsBJ4e8P6R8H9Nubqe1dfknllnVpo9w5X96XIIYkEitT/AIJv/wDBGL9pH9ir/gpZo3jfx7fWes+EdD8P397Y+KdH3JDNO6eQlvIj/NHJ+8L7fmUgZDHGBz0sVjZ1Ic1P3ZNfj959RjOFeCsBhMSqeYL61RUnyaSjJpbawUW76WTlZ9XY/XO6ktLTLXV5FEueskgXA/E1ynjP45/BT4e2pu/Gvxf8L6TEvLSalr1vCAPq7ivxf/4OKvAf/CjP2pdC8QfD3xJrlhaeN9Bl1HVtP/tidrYXqXDI7xozERhhtYqPlzkgDJrlv+CP/wCxx8Mv2/8ARvF/g7xRpXhu31Twy0F3ca1q+lXeoXl1HcMyqqbbyGONU8vGNjFi2SaxqZvVeOlhIU1zLa7/AOAdmD8LMs/1Ro8R4vHSVCdm1Gn70deV3953s+y8z9rPhP8Atdfs1fHHxNd+EPgp8dvCfi3VLC0+03tj4e1qK7eGHeE3sIyQBuYLn1NeEeOP+CoH/BJn4ffEbVbvxT4r8P2viyG/ZNXuo/h/Mb37TGQh8yX7KGZxtAyW7DnpWD+wL/wRv8N/8E/Pj8/xy8AfHDU9UttR0W607V9Fv9JjhidJGSSMxMjEpseMcNuyO+a/Pj/g5Utp/Cn7cGn32l2629t4i8DWNxc+SgUXE0M9xGWfH3mA289eBWmKxuPweD9pZKV7W30+TOLhjhHg3iPjL+zKVepOhKHMpq0Zcy3i1KP3WP1//ZU/bi/Z5/bTg1y8/Z/1PV9TsNAaKK/1W70SW2tzLICREjyY3uFG4gDgEeoz8u/tI/8ABfj9nL9mz4va78F/EHwV8c3uv+HtSezvY7ZLLyzIMYKv55yCCpHGQGAIBBFfHv8AwSg/4KG+HP2JP+Cbfxf8Z6pdxS64vi63g8IaZKcm71C4s2C8f3E8oyMemEx3FJ/wQy/YJ1P9tv8AaC1f9tL9olW1fQPDuutcj7dIJP7Z1tyJsyLnJjj3LIQeCxVRwCK5YZjiMZCjTpNKpLV9kj6Wp4e8O5Bi80x2Zxm8FhnGNNOVpVJtJ2ukl1tot/Rn7C/s5/E/xh8dfhBpXxR8X/CTU/BE2sRefbaBrF1HLdpbsAY5JRHxGzA52HkcZ9K8B/4Kmft7fH7/AIJ5eC7D4p+Cvht4S1jwvfTJYfa9VvboXUeossrrGYolCmJkj4fdkEEEDivsGaSJFEcS4A4AFfC3/Bwr4MbxT/wTc1zU1iLtpHijSrscfdzMYSfylr1MdKrQw0pU5PmS3PzDhGGW5hxdhqOIop0KtRR5G20lJ2te6d10bZ8n/Bn/AILj/wDBUr9sjx2/wu/Zt+EHgObXHs5LqGzttNO5YY8bn33N0E43AY9+B6eew/8ABfP/AIKVfBL4vX3hX49z6TJJo13Nbav4ZuvCcELrcRkjyWaNkaMbuCwLYHIDdD83/wDBL79r/wAI/sK/tY6d8cPiBp2qXukW+j31pdW2kRxtPIZYsIAJGVcbwpOTxjoa579qL4/ad+3J+2n4l+M+rPp/g7T/ABjrySebqLO8OnQLFHCjymFWZjsjUtsU5YnFfIPG4p4aNaNeTnzWavpY/q6nwNw3hs/rYCrlNFYRUlJVOW8+e7TS1b21Vloz+iz9lz9rXwT+07+zLoP7Uulo2laRq2jve38N7KCbBotwuEZhwQjI43YGQAeM4r8m/wBsz/gu94v/AGjPifq/w7+HV/4p0T4bWqS2+k2PhDURY6n4inDBY2uLwAyW8DklvLiG8gKpJLEr9g694X+G/wAHP+CBvjHwp+y18WbLxnY6Z8ONQiufEukSfLLNMS14dv3osCWT5GwyjGa/Df8AZt1XT/DP7RfgTX/ECr9gsfGulXF95g+UQpeRM+c8Y2g/lXq5pisRShSpqVnJJu2vqrn5x4bcH8P4vFZnmMqDqRoTlClGSaaSu02ntK1krq61e5+jvwn/AOCB37aGk/Cm7+Nus+JfBV/4vv8ATjdReA/FenS3znPziJ7l2wlwR8ueQDwXHJrxX9mL/gsF+0l+xP8AFuPS7HSri38MWdwtr4n+G9/qM89mkkbFJjai4Z5LJ+OEVigYEkYOB/Q5GVkgDqQdw4YV/NR/wW08DWPw5/4KY/Eq10a2SG31DUbfUlhiHAkuLaKSQ8eshdvq1GbYV5dCFbCyaadnruV4bcS0/EDMsXlefUKdSEoOUbRS5VdJxVu104t6ruffH/BZD9hL4dftwfszaT/wUp/ZG0CCTVf7Fi1LXbfT7dVfV9LZMtK6p964gOc/xFQ6knYtfn//AMEuf2+PEH/BPv8Aab0/x5czzzeFdX2af4z01HP76zZuJQOheJjvXP8AtDjea/XD/g3U8Xaj4t/4Jn2ei+I4zLbab4s1axsEmXKm3Z1lKgHqu+WQY/Cvyn/4LYfsd+D/ANj/APbb1Lwh8NZNnh/xJpieIdM04pgWCzzTI9up7orxOV9FZR2rDMqU4Ro5jRfLJpOXq1f/AIDPZ4EzLC4rGZjwHmi9rTg6kaUnq+RP4b943Uovpr2R7r+2B8UW/wCCzn/BVbw38BvhHrkt54A0KRbC31O1bKPZpiXUL9ewDYKIfRY/XFftU+seD/gX8JZpbWzh0/QPCegMYLZMJHb2lrB8qj0ARMfhX5Uf8GtHwf8ABF5YfE/4yXdoZPElpcWekwTvgiGzdGlYKOxZ1AJ9EUV9cf8ABdT40TfAr/gnR4x/sy98nUfFjQeHbHY2GIuH/fEDv+5SUH616uBqVIYSWNk9Za/dsj8244w9PG8WYLhHCRao4bkpJdXKdnKT82uvqfjT4c/Zm+IP7cngv9oX9ry2W8uL3whGfEksUXJuGubx5ZlPGSUt974H92tP/gil+1vc/siftw6Bf67qYh8NeLR/YPiJZHxGsU7L5M57ZjmEZz2Vn9a7/wD4Jv8Axb/4Ke/Cz4D6t4P/AGSP2UU8SeG/GN7JLqOs3vgye9jv1CG3eHzTIsTRgB1IA6lsmvkb49fCL4rfs7fEq68AfGPwHd+GNfhVLiXS7iPy2iSUb0KgE4BU8YOR9RXy0pPC+yrUk+bVybWju77+jP6Mo4eHECzLJMdVpOi4qNKEZpzUVBRd47q0lzJ935H9X6MrLvRgQeQQeKNzqME18s/8Edf2vv8AhsD9h7w34p1rVBc+JPDcQ0PxMXYb2uIEURyt7yRFHz3O70r6kOFJy3U199SqwrU1UjtLVH8N5xlmJybNK2BxCtOlJxfye/o90Ox/00opMD1FFaHmjMgjpgignvjPrQTn+D60DgD60maaHz//AMFUvGHiDwR/wTy+LWv+GGeO7TwdcQrJH1VJWSGQ+3ySNX8z/hWz0S68WafFrIAsjewi9HQeTvXf9PlzX9XHxx+FGg/HL4P+Jvg74nH/ABL/ABNolzp1yduSiyxlA4HqpIYe4FfzAfHH9kf46fAL9oDxF+z74n8EX02v6A0shtra3ZmvbNeVuoFAzLGyfPlQcDdnG04+W4ho1nOnVirpH9PeAGaZdHL8dl9SSjVbUtXZ8trXXo739T+pjwZpemWXhLS4NCCLYJplutksR+UQiNdmPbbitSKVImBOAR0J7V+VX/BMj/gvv8CND+AOjfBD9srxDfeH9e8KWKWFn4iksJLm31O1iAWPf5YZ45lUBWyuG2g5ySKX9rb/AIOSvhN4c8Z6B4b/AGSvDdx4ksItXgl8U63qli8EclmGHmW9rG+1zIy5/eMABgYBzkewszwPsYzjJdNOq+R+RVvDbi+tnNTBrDyaTfv7QaW0ufbVa9X5XOU/4OpdAt3Pwh8XwRHcy6tZSyAdgYJFH6tXxD/wSv8ABn7fvxH+JPiLwP8AsD/E5/Det3Oirca26aslmZrWOUBRvZW6M4OBg81+in/Bylp+neLP2V/hh44tyVEnih3t4Z12S+XPYl+VPII2jI7E18G/8Esf2rh/wTp+K837VPxD+FHiXV/CWp6RdaDFcaNEiiW6Z45AoeVlQlfLOe49DXzuYShHPUqjcU7NtbrRH79wPLF1PB1/V6cataHtIxpzSlFyU27NOyfl5n7B/wDBLf4Hfty/A/wx400r9uTxvP4i1bVtYtbvR9Wm8SnUgYRAY3jBbBjwyjjABzkZr4T/AODozwLKnxZ+E3jVVGy88N6laSOeu6O4icfpJXR/Ev8A4OadT+IAXwP+zd+zdcaXq2rTx2dlrPinVklFtJK4RXFvEmHI3ZAL445BrW/4OV9NtNS+GnwY0e61yO88Vwy3xmsYUBnmgaGEPP5a/dUzJjoBlsDpXpYuVGrldSFBuSilq99/+HPz/hTL88yjxKwWPzmjGh9YdT3Y2SSVN62TaittL79D8zvgv+yR8QvjZ8EfiB8Y/AHlXlv8OIrK61zTEybhrW4aRGuEA6rHsBf0U57GvV/+CW//AAUc1/8A4J7fHlNYvhNd+C/ETRWvjDSoycmIEhLqMdDLFuYj+8pZe4r6B/4N2k8X/DX9ofxZ4H+JPwi8WHQfH/hZdOg1CXwvcvp/nxy+YUuJCmxEeMyqGY7ckAkbq5P/AIKGf8EKf2oPAX7RV/dfsmfCW+8WeB9cma70gabcR+ZpZY/PaSrIykBD9xuQUIGcg14dLAV6VOli8PfmW6+fbs0fseZcX5JmWa47hnPHBUKkVKlJtJNWV1zfzRkrp7/cfun4G8b+G/iR4W0/xz4L1qDUtI1azju9Ov7Vw0dxC6hkdSOoIP8AnFeB/wDBYzw/Hr//AATM+LNu6bmtPDgvVGO8E8cmfw214h/wRL+Gf7fv7LHgJPgN+0j8GNVTwvLezyaVcXV9aE6CCu/GRcM0kMjA/Iq5RyCNwdtv1d+3X8IPiP8AtBfspeM/gb8KDosereLNKbTBca/PLHbW8MpAllPlI7FlXO1cYLYycV9lFyr4CXMrOSas/NH8nVcHhOG+N6VOniI1KVOrCSqRkmuRSTu7bNLdd/I/nb/4JcXOjXX/AAUU+Etr4l0eyv7C78YwWlxa39sksTrMGi+ZXBB5cYz3Ar7A/wCDjvwj8EPhV8R/CFn8EbbS9B13X9EnTxrpPh5I7dbq3imje1e5ihwpbeJNpYZIT2rt/h//AMGw/wAWNNe2u/Ev7Xfh/S57e6Fyk2g+FppZ0cDA2zPLEwA6jtnnrXq2if8ABtH8CtR1RdZ+Ln7S3jLxBKWBuxb2sFu03r87+aw/WvnKGX5jHAywypLV3u2vT16H9B5zx5wDW4xw+dvMZONKDi6cKc3zNt2bbSjpe+26Wp8/f8G1GneIPijf/Gj4HeJ4Lm58BeIPBqW2uWrZMBuJi8A46BzC0g9woPYV8t/tS/8ABMr49/s1ftKXnwF1u1sYPtEjy+Dtb1K/jsrPX4t4CLBczFYVnIPMUjoQykZOV3f0F/st/skfAL9jb4dr8L/2f/AsWjab5xmupC5lub2YjBlnlPMjY454A4AA4rqvip8Jfhf8cvB0/gH4w/D7SPEujXI/fadrFik8RPqAw4YdiMEdjXpVMkp18FTpTfvQ6rze3p+p+d4fxlrZZxhjMxwlK+HxCinF2veKsp725u6vqtLp6nwB+z5/wW+8D/s//C62+Dn/AAUE8J+KPCfxD8JWK2Vy8OkPeQa6IlCrcQzRZRi4wSd2wschyDx+Y/xXPxf/AOCv/wDwUD8Qa58FfAbvqPi3US+l6dPcKi2NhBGsaPPITtQLGgZjz8xIGcgH9kvFf/BCP/gm/wCKdZh1W9+F+uQxQcRafB4wvfs8a5yVVWkYop9FIr3z9nb9kD9mn9lHQ5PD37Pnwc0Xw1FOoF5c2UBa5ucf89Z3zJJ/wJjSnl2NxajTrzXInfTd2+Q8u8QOC+FqlfMMlws3i60WvfsqcG2m2ldytfW132vYyv2E/wBlHRf2L/2VfCP7O+kXqXUmiWLPqd9GDi5vZXMs8gzzgyO2M9FCjtX5Vf8ABx34B8SfFn9tnwpp/wALfCms69qOm/D6G21e30nSJ5/IZry4liUlEILFJAcDoCPWv20UE4AGeaYqpDcNdKhEjptY7j0GSOOnc/lXfisDTxOF9hflWnnsfAcL8a4rh7ih55Vp+2qPnbTly3c929Hp1tY/J7/g3G8N/Gz4B+MPHXwx+LPwD8eaDbeKrW1u9J1jVPCd3BYCW38zfHJM8YWNmR1K54OCOuAen/4LtfCf9tD9tHxX4U+Af7OP7N3ifWdD8MTy6jq2uP8AZ7azuryWNViSJ5pV3CNC+49NzkDoa/UATtKNrE9PWobyxhCiSSZI97hVZ2A3E9AM9z6Uo5bGGXrC894rrpte53YjxDr1ONpcTLDQVXS0W5OKko8vN0e3yTPIf2EfhlN8Hv2Q/h38LL/4f3Hhe98P+Gbez1DRruaGWWG5UHzmZ4GZH3ybn3A87+ecgfJv/BY7/gkZ8Vv+CgHxX8KePPg2fDOkz6Toj2es6trWoyo90vmFooxHHE33Mv8AMT/HjHFffuqaw2ieI9K8PDw9qdx/aYnJv7W03W9p5SBv38mR5e7OFGDk5HatDDddtbVcNSrYf2M1dHgZXxbmuUcQTzfBtKq3J6pte/dvd3e/W/3n5/8A/BJj/glr+1n/AME6/iBqOra/8c/Cep+FvEMCpr3h2wt7ou0sYPlTxM6qquuSpyMMpI7DH6BsATyKaNoHTGfenbmXjbVYahSw1JU6ey7nPxBn+YcTZnLHY5xdSSSbjFRvba6W789wopNx/uGiug8WyDduGAOcUcEBDSbQvLUhB+8vY0J3BtIcOnrXlH7UH7FX7O37XmlWlt8avBAudQ0sltG8QadcNa6jpr5zuguI8Onzc45XI5Br1dSScnpSOQODUThGpHlkro6cJjMVga6r4ao4Tjs4uzR8JfEX/giZd/EDR7jwhdft3/ESXQ7iMxSWOuaXY38zRn+EzlUduO55rZ/ZX/4INfsM/syeMrH4gzaTq/jXXdPlSWyuvFU6Pb28qnKulvGioSCAQX3kHofT7UGW+bOKxvEWk+Pb3xX4f1Pwn4ztLDTLK7mPiHSbnRvtD6nC0RWNIpRIpt3STa27DhgSCORjmhgMJGpzKCv31f4ao+hxPH3F9TBSw8sXLkluo8sb9NXFRb07tnJftD/sXfsy/tUXGk337QXw4j8SNoqSJp0F3fzpFDvILt5aOqljtA3EZwMe1cDYf8Erf+CeOlsv2L9kjwa2w/K1xpvnH/yIW968b8a/8FAf2oPil+2ZeeBP2VNL0W88EaDNJodvL4h0a4k07xRrMD772JdTti39mtDECI2kjaOVg3Tg173+zh+3l+zr+0ppurav4P8AGC6fFpfjY+Fh/bTJbi9v/wDlkLYlv3qS4Jj6MwHKjpRKphKtXSKu9L97HymA4xxbgsLTxc4wTfLHnko+fKrpd+hv+Bv2K/2Qvh9ew6l4S/Zj8BWNzbuHguYfCloJImHIZW8vIIPfNeoTpavKsslpC0ijAkaMFsemetSNbqilt3QZPHSogyu2QefSulRVP3UrG9bF4rFz56tRyfm22Kp2gopIHoDxSKkYU/L+FOIwPfNG0g9MinZGN5PrcXdgYz+VNIBHJNOK7fmFBCtwKomzECnft9RRkUqg9Sce9CAHmldBZhyehGaVSMYFG3BBFG0HjFO6FqN2knJBoVSeacAcZ3GgEg5c4HcZpO9rj93uKCc9cetI0LMCR+pry748fto/sz/s1a9Y+F/jL8VrLR9Q1CHz4bPyJp5I7fdt+0SiFH8mLOR5j7VyDgnBrwq8/ab/AGof2h/2hYf2brnS7f4Q+E/GPgXVb3wf4hjvl1DV9f2fukntZ4G+z2jRho5/L/es0bA5GeMJV6SlyN3b6Lv0v2PLxWbYbDPlXvS7Lv0v2+Z778Y/2l/h38Gfs2h3+oLqHibV2urfwx4Ws5ALnV76G2a4+xo7Dy4pWQDaJWTduG3dmvz3+JX/AAUf8GftreNvBvgr4naF4t8F+CPF1xFYaZeXmgmK68G+Lradhbala38WUnCzMIZIZdroQDs2sTTv2V/gJ8W/jL4F8a/sseNPhdqui+IbPxG5n8c2GgPBDoHiHTiWt9an1O8nefU7i4kVD5UI2RwyEcA4r73/AGeP2XfCnwXttW8SanFa3viTxfPZ6n40a2gKabPrEUIjmvLW1ct9naVhubBJJAPFckHiMRKMo+7Hrp/X9M8WNfNc6lGVP3KfXT8/u/qx0fwH1f4x6v8ADi3X46eERpHiCyuprKT/AE6CZtQhhby475hblo4WnVfNMIZvL3bcnFdi2R9MUEEnJ6k0AZ78V6F22fW0qfs4KN7gY8Dil2sxwVpc4OQTxQxO7NUrmgYPoaKMj0FFMXMhrElcgfU0kfelB5wBznmkbGeB9aSVhiknBBpqNu+UinZRf4c5oVT24pgABU8elKG5JDHIOc0AHpnNK4J+TOOKBWPH/HX7Fvwh8QXvirxd8OLOTwJ4s8WeHLzSr7xL4ZJhJ+0JtNxJbKRDNOv8MjruXJw1fNniD9hL4hfsq/Gqb43fCX4eyeL/AAj4U0bSP+Fc+AdLmUSXniRLNNMjvLwEARxwx7pWmyeZC2MjNfeWMDApPnPU1yVcJRqWdrNO6t3/AK6HjYzIsFi2pW5ZJ3TXf+vve5+ZHwS/a3/aU/Zo8J/tP+Pv2iNS19vG3h7SdFnsPDvie4jlhGu3yzLFHaRQSPH9mZzEEVDkxx/MMg19XfsFftV/Ff8Aav8ABKfETXvhja6Z4ZSzW1tPEUl95Nzq2oxHy7tl0/Dm1gEquq+ZKZDtOUHFewfED4J/Cj4pRxRePfh7pepmHVbLUkkuLYB/tVo++2lLrhmMZyVBJAyeOufPtJ/Zg8R/CfxbpFt+zv4zm0DwzqHxDvvFPjqw1GZLpZ1ni/eWVrG0WYo5Zz5pbeChDYDbsDKjh61GycuaK089Xe/4nDg8BmOWVo2qc9JXVuru9/kdf8bv2oPgJ+zhbaPd/HH4naX4Zi16/ez0qXU5WVLiZIzKyBgpxhFLEnA4610GlfFn4VaxpmlaxYfErQJbbXLT7Vo00eswbb6HgebCd/7xckcrkc18sf8ABRv9kT9on9oT4ueAvH3wo0eLUdN8H6LrCR21r41Gj3seo3kaQpcI720yOiRhgykDdvPSvn34p/sRfG3wb8Rvg94L8d/AJNZ8HeBvhNp2h6jdeH/h9F4j02XUJ79pr1BDLdRTQHakZ+0IGOZG4xxVyxNWlNp0+ZafjYMbm+YYbEzgqTcU1Z2fW3X7z9S5I1GcPwBnjnjFQvKiEZIGenH51+XHjH4VfH+P/goJeePtG8L6v4P8Oap8fLHR9I8cR3GqLJZWFlp1vtsxYoRbvaXZjaFZ2yockHsayfh/8VfiFoHxh+MuiR/FDxp4s1q58H+MdStfE+leI9Wtf7I8lXNvb6jpd1F5dtNEdq28tvIuQM4bOal43f3bK7X3IzjxFUg/3lFpXavfsfq/GnmtwSfTjrTivlnZg/iK/M2T4l/tu6m+oaX8KfEc+pQan+xzoer6w+v+Ib2J7G4e3kWa9s/KVt16x5ySpJGS1fZv7IP7QXhLxr4F8D/CTVNd1GfxkfhVo/iDUI9QtJ90sEsaR+YZnG2R/MHzDJYZGetb0MRCvLks169deh2YXPKeIrcjg4+b2euy8z1WTxb4Sh1FtGm8UWK3qxtI1mbyPzQqglm2ZzgAEnjgA145r3/BSP8AY80rwt4n8YaH8WofEVp4P0k6jrv/AAjFlNfGKDzkhyHRRGxDyKCA+RkkgAZHxf4n/ZB/aS03/gpZqnxK+G3wK1K/tLL43Qa/barf6DHb6fcabcwIt5I+qC4SYiIPKY7ZUeNnHzAgnHefs4/8E/8A9pzwNpHj79nzxp4es4/Afiuz8R6Omp6h8QprqK2sbuaWSzktNJjgEcUiuyM7ySliNwG3pXN9axEpOKhy76vrb/M8/wDtbOMRNxo0LK7V2r7bfed38Zf+CsKaN8Nda8RfDX4U3uhar4Y8V6TpXjCP4mwm1j0Kz1JCbbU5Fsnm82EnaCquGG4ZrwL9of46/tw/tAfCn4cfFq6i1m00vxRr2seErfQPCHie58P2Grah8x0jWI5nUXIhmKSARSkKzRoOA/P018DP+CUvwk+Gfwn1n4WeLfGmq6npvjLwrp+neOdG0yQ29nf6laMjJqkLyGS4t5v3a/KJCmRkKDX08+iaQ1lbadLp0U8VkYjai5QSeW0YwjgsDhgOjDnkml7DF1ov2sraLbvf/hvxKWW5zj4XxNVwulovU+EfhB8Ev2wfHvhlvjL8ObPS73WPHXw3sfBnxQtvjPplzp99b6jYxtA9/CkaOLiJ1kbKZCuyBg2Sa+ofg/8Ase/DT4d/Cj4V/D/xTC/iDUfhNBG3h3XZpHhkjuRE0TyKEYYRg7DyySNoXOdoI9ZQkNg5PHUmnHaeFHNdVKhGm73v/V9Pmkz0sHkWDws3KXvye99t7u3q0mDsZGLsfwxQDgHBx+FJSjj0rd6vU9taKwnJ4pdwLAYxSnZjjrTSuwZAyTSSsMDxz0pRkk7vTikALDLHp2xSqRj731GKL6gJRSb19aKozHMMHANNIAxgn3oooWxoKIwGyDxjNNZsMKKKAHZzggU4uSMYoop9BX1G8Ud8UUVCd2D2Exnr/OgR5yAfzoooehN2HIbbntSu7EZLdD2ooqbu1hdLADIfvNke5qOS2t2Z2aBSZeJCRkv9fX8aKKLsTjFu7RJbpFb4WGCNAIxGNqAYUdFHt7dKpReHfD1t4im8X2+g2ceqz2UdpNqKW6iZ4I2ZkiL9SilmIXpkmiiqT1JdODd2i+1w8owxP4saj8teTgcnPSiik229S1aOw8qExx1pAAOgoopDuxQoY5J6UBsdB+NFFC0C7EwTk0daKKtbCCM4GTzSnLng4zRRTWxoJu2qaYOTnpzRRSsgDj1P5UUUUxWR/9k=';
const state = {
  currentView: 'dashboard',
  currentBatchId: null, // Digunakan saat di sub-view batch-details
  batches: [],
  packages: {}, // Menyimpan daftar paket dinamis dari database
  sales: [],
  expenses: [],
  cloudConnected: false,
  theme: 'dark',
  currentSaleItems: [], // Keranjang belanja sementara saat tambah/edit pesanan
  customers: [],
  productionRecords: [],
  packageStock: {},
  currentReportFilters: {
    batchId: 'all',
    customerName: 'all',
    paymentStatus: 'all',
    deliveryStatus: 'all'
  }
};

// --- DATE FORMATTER ---
function formatDate(dateStr) {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (e) {
    return dateStr;
  }
}

// --- ESCAPE HTML ---
function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  const s = String(str);
  return s.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// --- CURRENCY FORMATTER ---
function formatIDR(val) {
  const number = parseFloat(val) || 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
}

// --- UPDATE CLOUD STATUS ---
function updateCloudIndicator(dbStatus) {
  const dot = document.getElementById('cloud-indicator-dot');
  const text = document.getElementById('cloud-status-text');
  if (dot && text) {
    if (dbStatus.connected) {
      dot.className = 'indicator-dot online';
      text.textContent = 'Cloud';
    } else {
      dot.className = 'indicator-dot offline';
      text.textContent = 'Lokal';
    }
  }
}

// --- THEME MANAGEMENT ---
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  state.theme = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);
}

function updateThemeIcons(theme) {
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  if (sunIcon && moonIcon) {
    if (theme === 'dark') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'inline-block';
    } else {
      sunIcon.style.display = 'inline-block';
      moonIcon.style.display = 'none';
    }
  }
}

// Add event listener for theme toggle
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      state.theme = newTheme;
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      updateThemeIcons(newTheme);
    });
  }
});

// --- AUTHENTICATION & LOGIN WALL ---
let currentRole = 'kasir';
let enteredPin = '';

window.selectRole = (role) => {
  currentRole = role;
  const btnKasir = document.getElementById('btn-role-kasir');
  const btnAdmin = document.getElementById('btn-role-admin');
  if (btnKasir) btnKasir.classList.toggle('active', role === 'kasir');
  if (btnAdmin) btnAdmin.classList.toggle('active', role === 'admin');
  clearPin();
};

window.pressPin = (num) => {
  if (enteredPin.length < 4) {
    enteredPin += num;
    updatePinDots();
  }
  
  if (enteredPin.length === 4) {
    setTimeout(window.submitPin, 200);
  }
};

window.clearPin = () => {
  enteredPin = '';
  updatePinDots();
};

function updatePinDots() {
  const dots = document.querySelectorAll('.pin-dot');
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx < enteredPin.length);
  });
}

window.submitPin = async () => {
  const pin = enteredPin;
  let isValid = false;
  
  if (currentRole === 'kasir' && pin === '1234') {
    isValid = true;
  } else if (currentRole === 'admin' && pin === '6789') {
    isValid = true;
  }
  
  if (isValid) {
    sessionStorage.setItem('pos_authenticated', 'true');
    sessionStorage.setItem('pos_user_role', currentRole);
    
    const loginOverlay = document.getElementById('login-overlay');
    const mainApp = document.getElementById('main-app-container');
    if (loginOverlay) loginOverlay.style.display = 'none';
    if (mainApp) mainApp.style.display = 'flex';
    
    showToast(`Selamat datang, ${currentRole === 'admin' ? 'Admin' : 'Kasir'}!`, 'success');
    
    await runCoreInitialization();
  } else {
    // Shake card
    const card = document.querySelector('.login-card');
    if (card) {
      card.classList.add('shake');
      setTimeout(() => {
        card.classList.remove('shake');
        clearPin();
      }, 500);
    }
    showToast('PIN yang Anda masukkan salah.', 'danger');
  }
};

window.logout = () => {
  sessionStorage.removeItem('pos_authenticated');
  sessionStorage.removeItem('pos_user_role');
  window.location.reload();
};

function handleLoginKeydown(e) {
  if (sessionStorage.getItem('pos_authenticated') === 'true') {
    document.removeEventListener('keydown', handleLoginKeydown);
    return;
  }
  
  if (e.key >= '0' && e.key <= '9') {
    window.pressPin(e.key);
  } else if (e.key === 'Backspace' || e.key === 'c' || e.key === 'C') {
    window.clearPin();
  } else if (e.key === 'Enter') {
    window.submitPin();
  }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();

  const isAuth = sessionStorage.getItem('pos_authenticated') === 'true';
  const loginOverlay = document.getElementById('login-overlay');
  const mainApp = document.getElementById('main-app-container');
  
  if (isAuth) {
    if (loginOverlay) loginOverlay.style.display = 'none';
    if (mainApp) mainApp.style.display = 'flex';
    await runCoreInitialization();
  } else {
    if (loginOverlay) loginOverlay.style.display = 'flex';
    if (mainApp) mainApp.style.display = 'none';
    document.addEventListener('keydown', handleLoginKeydown);
  }
});

async function runCoreInitialization() {
  setupEventListeners();

  const dbStatus = await window.db.init();
  state.cloudConnected = dbStatus.connected;
  updateCloudIndicator(dbStatus);

  await refreshData();

  // Seeding khusus data pesanan 19 Juni dari input user
  if (!localStorage.getItem('seeded_june_19_orders')) {
    try {
      console.log('Memulai seeding data pesanan 19 Juni...');
      
      const ordersToSeed = [
        { customer_name: 'MDN', items: [{ package_id: 'B', quantity: 10 }] },
        { customer_name: 'IDI', items: [{ package_id: 'C', quantity: 2 }] },
        { customer_name: 'MES', items: [{ package_id: 'A', quantity: 1 }, { package_id: 'B', quantity: 1 }] },
        { customer_name: 'RTW', items: [{ package_id: 'E', quantity: 3 }, { package_id: 'H', quantity: 2 }, { package_id: 'G', quantity: 1 }] },
        { customer_name: 'ETP', items: [{ package_id: 'C', quantity: 1 }] },
        { customer_name: 'Maya', items: [{ package_id: 'D', quantity: 1 }, { package_id: 'H', quantity: 1 }, { package_id: 'G', quantity: 1 }] }
      ];

      for (const order of ordersToSeed) {
        let match = state.customers.find(c => c.name.toLowerCase() === order.customer_name.toLowerCase());
        if (!match) {
          match = await window.db.addCustomer({ name: order.customer_name, phone: '' });
          state.customers.push(match);
        }

        const saleItems = order.items.map(item => {
          const pkg = state.packages[item.package_id];
          const price = pkg ? pkg.price : 0;
          return {
            package_id: item.package_id,
            quantity: item.quantity,
            price: price
          };
        });

        const totalBill = saleItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const saleData = {
          batch_id: null,
          customer_name: match.name,
          package_id: saleItems[0].package_id,
          quantity: saleItems.reduce((sum, item) => sum + item.quantity, 0),
          total_price: totalBill,
          payment_status: 'unpaid',
          delivery_status: 'pending',
          notes: 'Impor Otomatis Sistem',
          items: saleItems
        };

        await window.db.addSale(saleData);
      }

      localStorage.setItem('seeded_june_19_orders', 'true');
      console.log('Seeding data pesanan 19 Juni sukses!');
      await refreshData();
      setTimeout(() => {
        showToast('Berhasil mengimpor 6 data pesanan pelanggan!', 'success');
      }, 1000);
    } catch (seedErr) {
      console.error('Error saat seeding data pesanan:', seedErr);
    }
  }
  navigate(state.currentView);
}
// --- REFRESH DATA ---
async function refreshData() {
  try {
    state.batches = [];
    state.packages = await window.db.getPackages();
    state.sales = await window.db.getAllSales();
    state.expenses = await window.db.getAllExpenses();
    
    // Load customers
    state.customers = await window.db.getCustomers();
    
    // Auto-seed customers if empty but sales exists
    if (state.customers.length === 0 && state.sales.length > 0) {
      console.log('Tabel pelanggan kosong, melakukan migrasi/auto-seed pelanggan dari data transaksi...');
      const uniqueNames = [...new Set(state.sales.map(s => s.customer_name.trim()))];
      
      for (let i = 0; i < uniqueNames.length; i++) {
        const name = uniqueNames[i];
        const padding = String(i + 1).padStart(3, '0');
        const id = `CB-${padding}`;
        await window.db.addCustomer({ id, name, phone: '' });
      }
      
      // reload customers
      state.customers = await window.db.getCustomers();
    }
  } catch (err) {
    showToast(`Gagal memuat data: ${err.message}`, 'danger');
  }
}

// --- NAVIGATION & ROUTER ---
function navigate(viewName, params = {}) {
  state.currentView = viewName;
  
  // Toggle layout classes based on receipt view
  const appContainer = document.querySelector('.app-container');
  const contentHeader = document.querySelector('.content-header');
  
  if (viewName === 'receipt' || viewName === 'report-preview') {
    if (appContainer) appContainer.classList.add('hide-sidebar');
    if (contentHeader) contentHeader.style.display = 'none';
  } else {
    if (appContainer) appContainer.classList.remove('hide-sidebar');
    if (contentHeader) contentHeader.style.display = 'flex';
  }
  
  // Update sidebar active state
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.getAttribute('data-view') === viewName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Khusus untuk sub-view batch-details, hilangkan active di sidebar karena itu bagian dari "batches"
  if (viewName === 'sales' || viewName === 'batch-details') {
    document.getElementById('nav-sales').classList.add('active');
  }

  // Update Header Title & Action Buttons
  const viewTitle = document.getElementById('view-title');
  const viewSubtitle = document.getElementById('view-subtitle');
  const actionsContainer = document.getElementById('header-actions-container');
  if (actionsContainer) actionsContainer.innerHTML = ''; // Reset actions

  // Render view body
  const bodyContainer = document.getElementById('content-body');
  
  switch (viewName) {
    case 'dashboard':
      if (viewTitle) viewTitle.textContent = 'Dashboard Keuangan';
      if (viewSubtitle) viewSubtitle.textContent = 'Ringkasan performa penjualan dan operasional Pempek Cek Boya';
      renderDashboard(bodyContainer, actionsContainer);
      break;
        case 'sales':
      if (viewTitle) viewTitle.textContent = 'Daftar Pesanan';
      if (viewSubtitle) viewSubtitle.textContent = 'Kelola pesanan pelanggan dan status pengiriman/pembayaran';
      renderSales(bodyContainer, actionsContainer);
      break;
    case 'batch-details':
      navigate('sales');
      break;
case 'packages':
      if (viewTitle) viewTitle.textContent = 'Kelola Paket Pempek';
      if (viewSubtitle) viewSubtitle.textContent = 'Atur menu, harga, dan komposisi paket penjualan';
      renderPackages(bodyContainer, actionsContainer);
      break;
    case 'production':
      if (viewTitle) viewTitle.textContent = 'Produksi Pempek';
      if (viewSubtitle) viewSubtitle.textContent = 'Catat produksi butiran pempek harian';
      renderProduction(bodyContainer, actionsContainer);
      break;
    case 'stock':
      if (viewTitle) viewTitle.textContent = 'Stok Paket';
      if (viewSubtitle) viewSubtitle.textContent = 'Kelola stok paket siap jual dan alokasi packing';
      renderStock(bodyContainer, actionsContainer);
      break;
    case 'expenses':
      if (viewTitle) viewTitle.textContent = 'Catatan Pengeluaran';
      if (viewSubtitle) viewSubtitle.textContent = 'Log pengeluaran operasional dan bahan baku';
      renderExpenses(bodyContainer, actionsContainer);
      break;
    case 'customers':
      if (viewTitle) viewTitle.textContent = 'Rekap Pelanggan';
      if (viewSubtitle) viewSubtitle.textContent = 'Informasi total transaksi per customer/pembeli';
      renderCustomers(bodyContainer, actionsContainer);
      break;
    case 'order-recap':
      if (viewTitle) viewTitle.textContent = 'Rekap Pesanan';
      if (viewSubtitle) viewSubtitle.textContent = 'Rekapitulasi pesanan per batch dan pelanggan';
      renderOrderRecap(bodyContainer, actionsContainer);
      break;
    case 'settings':
      if (viewTitle) viewTitle.textContent = 'Pengaturan Cloud';
      if (viewSubtitle) viewSubtitle.textContent = 'Hubungkan data lokal Anda dengan database cloud Supabase';
      renderSettings(bodyContainer, actionsContainer);
      break;
    case 'receipt':
      if (viewTitle) viewTitle.textContent = 'Struk Penjualan';
      if (viewSubtitle) viewSubtitle.textContent = 'Detail struk transaksi penjualan';
      renderReceipt(bodyContainer, actionsContainer, params.saleId);
      break;
  }
  
  // Re-initialize Lucide icons for dynamically added elements
  lucide.createIcons();
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
  // Navigation clicks
  document.querySelectorAll('.nav-menu .nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const view = item.getAttribute('data-view');
      if (window.location.hash) {
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
      }
      navigate(view);
    });
  });

  // Modal forms
  document.getElementById('form-batch').addEventListener('submit', handleBatchSubmit);
  document.getElementById('form-sale').addEventListener('submit', handleSaleSubmit);
  document.getElementById('form-expense').addEventListener('submit', handleExpenseSubmit);
  document.getElementById('form-package').addEventListener('submit', handlePackageSubmit);
  document.getElementById('form-customer').addEventListener('submit', handleCustomerSubmit);
  document.getElementById('form-production').addEventListener('submit', handleProductionSubmit);
  document.getElementById('form-stock-allocation').addEventListener('submit', handleStockAllocationSubmit);
  document.getElementById('form-adjust-loose').addEventListener('submit', handleAdjustLooseSubmit);
  document.getElementById('form-adjust-package').addEventListener('submit', handleAdjustPackageSubmit);

  const packageTypeSelect = document.getElementById('package-type');
  if (packageTypeSelect) {
    packageTypeSelect.addEventListener('change', (e) => {
      const compFields = document.getElementById('composition-fields-section');
      if (compFields) {
        compFields.style.display = e.target.value === 'single' ? 'none' : 'block';
      }
    });
  }

  // Event listener untuk kategori kustom pada form pengeluaran
  const expenseCategorySelect = document.getElementById('expense-category');
  if (expenseCategorySelect) {
    expenseCategorySelect.addEventListener('change', (e) => {
      const customGroup = document.getElementById('group-custom-category');
      const customInput = document.getElementById('expense-custom-category');
      if (customGroup && customInput) {
        if (e.target.value === '__custom__') {
          customGroup.style.display = 'block';
          customInput.setAttribute('required', 'true');
        } else {
          customGroup.style.display = 'none';
          customInput.removeAttribute('required');
          customInput.value = '';
        }
      }
    });
  }

  // Tombol Tambah Item Paket ke Keranjang
  const btnAddItem = document.getElementById('btn-add-item-to-sale');
  if (btnAddItem) {
    btnAddItem.addEventListener('click', () => {
      const pkgId = document.getElementById('sale-package').value;
      const qty = parseInt(document.getElementById('sale-quantity').value) || 1;
      
      if (!pkgId) {
        showToast('Silakan pilih paket pempek terlebih dahulu.', 'warning');
        return;
      }

      const pkg = state.packages[pkgId];
      if (pkg) {
        // Cek apakah paket sudah ada di keranjang belanja
        const existingIdx = state.currentSaleItems.findIndex(i => i.package_id === pkgId);
        if (existingIdx !== -1) {
          state.currentSaleItems[existingIdx].quantity += qty;
        } else {
          state.currentSaleItems.push({
            package_id: pkgId,
            quantity: qty,
            price: pkg.price
          });
        }
        
        // Reset pilihan
        document.getElementById('sale-package').value = '';
        document.getElementById('sale-quantity').value = 1;
        
        // Render ulang keranjang & hitung total
        renderSaleModalItems();
        recalculateSaleTotal();
      }
    });
  }
}

// --- RECALCULATE & RENDER ITEMS IN SALE MODAL ---
function renderSaleModalItems() {
  const container = document.getElementById('sale-items-container');
  const list = document.getElementById('sale-items-list');
  
  if (state.currentSaleItems.length === 0) {
    container.style.display = 'none';
    list.innerHTML = '';
    return;
  }
  
  container.style.display = 'block';
  list.innerHTML = state.currentSaleItems.map((item, index) => {
    const pkg = state.packages[item.package_id];
    const nameOnly = pkg ? pkg.name.split(' (')[0] : `Paket ${item.package_id}`;
    const subtotal = item.price * item.quantity;
    
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-secondary); border: 1px solid var(--border-glass); padding: 8px 12px; border-radius: var(--radius-sm);">
        <div>
          <div style="font-weight: 600; font-size: 13px;">${escapeHTML(nameOnly)}</div>
          <div style="font-size: 11px; color: var(--text-secondary);">${formatIDR(item.price)} x ${item.quantity} pcs</div>
        </div>
        <div style="display: flex; align-items: center; gap: 14px;">
          <span style="font-weight: 700; color: var(--accent); font-size: 13px;">${formatIDR(subtotal)}</span>
          <button type="button" class="btn btn-danger btn-icon-only" style="padding: 4px; border-radius: 6px;" onclick="window.removeSaleItem(${index})">
            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
  
  lucide.createIcons();
  
  // Daftarkan fungsi hapus item dari keranjang
  window.removeSaleItem = (index) => {
    state.currentSaleItems.splice(index, 1);
    renderSaleModalItems();
    recalculateSaleTotal();
  };
}

function recalculateSaleTotal() {
  const total = state.currentSaleItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  document.getElementById('sale-total-price-display').value = formatIDR(total);
  document.getElementById('sale-total-price').value = total;
}

// --- VIEWS RENDERERS ---

// 1. DASHBOARD VIEW
function renderDashboard(container, actionsContainer) {
  if (actionsContainer) actionsContainer.innerHTML = '';
  // Shortcut button
  const btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.innerHTML = '<i data-lucide="plus"></i> Tambah Pesanan Baru';
  btn.addEventListener('click', () => openSaleModal());
  actionsContainer.appendChild(btn);

  let totalIncome = 0;
  let totalExpense = 0;
  let paidIncome = 0;

  state.sales.forEach(s => {
    const price = parseFloat(s.total_price) || 0;
    totalIncome += price;
    if (s.payment_status === 'paid') {
      paidIncome += price;
    }
  });
  state.expenses.forEach(e => totalExpense += parseFloat(e.amount) || 0);
  const netProfit = totalIncome - totalExpense;
  const modalAwal = window.db.getModalAwal();
  const saldoKeuangan = paidIncome - totalExpense + modalAwal;

  // Calculate best selling packages/products
  const packageSales = {};
  state.sales.forEach(s => {
    let items = [];
    if (s.items) {
      items = typeof s.items === 'string' ? JSON.parse(s.items) : s.items;
    }
    if (!Array.isArray(items) || items.length === 0) {
      items = [{ package_id: s.package_id, quantity: s.quantity }];
    }
    items.forEach(item => {
      const pkgId = item.package_id;
      const qty = parseInt(item.quantity) || 0;
      if (pkgId) {
        packageSales[pkgId] = (packageSales[pkgId] || 0) + qty;
      }
    });
  });

  const bestSellers = Object.keys(packageSales)
    .map(pkgId => {
      const pkg = state.packages[pkgId];
      const name = pkg ? pkg.name.split(' (')[0] : `Paket ${pkgId}`;
      return {
        pkgId,
        name,
        quantity: packageSales[pkgId]
      };
    })
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  // Calculate top customers
  const customerSales = {};
  state.sales.forEach(s => {
    const revenue = parseFloat(s.total_price) || 0;
    if (s.customer_name) {
      customerSales[s.customer_name] = (customerSales[s.customer_name] || 0) + revenue;
    }
  });

  const topCustomers = Object.keys(customerSales)
    .map(name => {
      const cust = state.customers.find(c => c.name.toLowerCase() === name.toLowerCase());
      const tier = cust ? cust.tier : 'BRONZE';
      return {
        name,
        revenue: customerSales[name],
        tier
      };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  container.innerHTML = `
    <!-- Top KPI Cards -->
    <div class="card-grid">
      <div class="card card-accent">
        <div class="card-header-icon">
          <i data-lucide="trending-up"></i>
        </div>
        <div class="card-subtitle">Total Pemasukan</div>
        <div class="card-title">${formatIDR(totalIncome)}</div>
        <div class="card-meta">
          <i data-lucide="shopping-bag"></i> ${state.sales.length} Pesanan masuk
        </div>
      </div>
      
      <div class="card card-danger">
        <div class="card-header-icon">
          <i data-lucide="trending-down"></i>
        </div>
        <div class="card-subtitle">Total Pengeluaran</div>
        <div class="card-title">${formatIDR(totalExpense)}</div>
        <div class="card-meta">
          <i data-lucide="receipt"></i> ${state.expenses.length} Catatan pengeluaran
        </div>
      </div>

      <div class="card ${netProfit >= 0 ? 'card-primary' : 'card-danger'}">
        <div class="card-header-icon">
          <i data-lucide="${netProfit >= 0 ? 'wallet' : 'alert-circle'}"></i>
        </div>
        <div class="card-subtitle">Keuntungan Bersih</div>
        <div class="card-title">${formatIDR(netProfit)}</div>
        <div class="card-meta">
          Margin keuntungan bersih
        </div>
      </div>

      <div class="card" style="border-color: var(--success);">
        <div class="card-header-icon" style="background: rgba(16, 185, 129, 0.1); color: var(--success);">
          <i data-lucide="coins"></i>
        </div>
        <div class="card-subtitle">Saldo Keuangan</div>
        <div class="card-title">${formatIDR(saldoKeuangan)}</div>
        <div class="card-meta" style="font-size: 11px;">
          Lunas: ${formatIDR(paidIncome)} | Modal: ${formatIDR(modalAwal)}
        </div>
      </div>

      <div class="card card-info">
        <div class="card-header-icon">
          <i data-lucide="users"></i>
        </div>
        <div class="card-subtitle">Anggota Pelanggan</div>
        <div class="card-title">${state.customers.length} Member</div>
        <div class="card-meta">
          Registrasi customer aktif
        </div>
      </div>
    </div>

    <!-- Charts and Recent Activity Grid -->
    <div class="panel-grid two-columns">
      <!-- Financial Chart -->
      <div class="panel">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">Grafik Keuangan Harian</h3>
            <p class="panel-subtitle">Perbandingan pemasukan vs pengeluaran 7 hari terakhir</p>
          </div>
        </div>
        <div style="position: relative; height: 300px; width: 100%;">
          <canvas id="financialChart"></canvas>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="panel">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">Pesanan Terbaru</h3>
            <p class="panel-subtitle">Transaksi terakhir yang tercatat</p>
          </div>
        </div>
        <div class="table-wrapper" style="border: none;">
          ${renderRecentSalesTable()}
        </div>
      </div>
    </div>

    <!-- Best Sellers and Top Customers Grid -->
    <div class="panel-grid half-columns">
      <!-- Top Selling Products/Packages -->
      <div class="panel">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">Produk & Paket Terlaris</h3>
            <p class="panel-subtitle">Daftar menu/paket siap jual dengan kuantitas pesanan terbanyak</p>
          </div>
        </div>
        <div class="table-wrapper" style="border: none;">
          ${bestSellers.length === 0 ? `
            <div class="empty-state" style="padding: 20px;">
              <p>Belum ada produk terlaris.</p>
            </div>
          ` : `
            <table class="table-custom table-dashboard">
              <thead>
                <tr>
                  <th>Nama Paket / Produk</th>
                  <th style="text-align: right;">Total Terjual</th>
                </tr>
              </thead>
              <tbody>
                ${bestSellers.map((item, idx) => `
                  <tr>
                    <td>
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <span class="badge-custom-index ${idx === 0 ? 'badge-first' : idx === 1 ? 'badge-second' : idx === 2 ? 'badge-third' : 'badge-gold'}" style="width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: 700; font-size: 11px;">
                          ${idx + 1}
                        </span>
                        <span style="font-weight: 600;">${escapeHTML(item.name)}</span>
                      </div>
                    </td>
                    <td style="text-align: right; font-weight: 700; color: var(--accent);">${item.quantity} Paket</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `}
        </div>
      </div>

      <!-- Top Spender Customers -->
      <div class="panel">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">Pelanggan Teratas (Top Spend)</h3>
            <p class="panel-subtitle">Daftar pelanggan dengan akumulasi pembelian terbanyak</p>
          </div>
        </div>
        <div class="table-wrapper" style="border: none;">
          ${topCustomers.length === 0 ? `
            <div class="empty-state" style="padding: 20px;">
              <p>Belum ada loyal member.</p>
            </div>
          ` : `
            <table class="table-custom table-dashboard">
              <thead>
                <tr>
                  <th>Pelanggan</th>
                  <th style="text-align: right;">Total Belanja</th>
                </tr>
              </thead>
              <tbody>
                ${topCustomers.map(cust => {
                  const tier = cust.tier;
                  const tierLabel = window.MEMBER_TIERS[tier] ? window.MEMBER_TIERS[tier].name : 'Bronze';
                  const badgeClass = window.MEMBER_TIERS[tier] ? window.MEMBER_TIERS[tier].badgeClass : 'badge-secondary';
                  return `
                    <tr>
                      <td>
                        <div style="display: flex; align-items: center; gap: 8px;">
                          <span style="font-weight: 600;">${escapeHTML(cust.name)}</span>
                          <span class="badge ${badgeClass}" style="font-size: 9px; padding: 2px 6px;">${tierLabel}</span>
                        </div>
                      </td>
                      <td style="text-align: right; font-weight: 700; color: var(--success);">${formatIDR(cust.revenue)}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          `}
        </div>
      </div>
    </div>
  `;

  renderFinancialChart();
}
function renderRecentSalesTable() {
  if (state.sales.length === 0) {
    return `
      <div class="empty-state" style="padding: 20px;">
        <p>Belum ada transaksi.</p>
      </div>
    `;
  }

  const recent = state.sales.slice(0, 2);
  return `
    <table class="table-custom">
      <thead>
        <tr>
          <th>Pelanggan</th>
          <th>Pesanan</th>
          <th>Total</th>
          <th style="text-align:right;">Aksi</th>
        </tr>
      </thead>
      <tbody>
        ${recent.map(s => {
          // Format pesanan dari items kustom
          let items = [];
          if (s.items) {
            items = typeof s.items === 'string' ? JSON.parse(s.items) : s.items;
          }
          if (!Array.isArray(items) || items.length === 0) {
            items = [{ package_id: s.package_id, quantity: s.quantity }];
          }

          const itemsText = items.map(item => {
            const pkg = state.packages[item.package_id];
            const nameOnly = pkg ? pkg.name.split(' (')[0] : `Paket ${item.package_id}`;
            return `${nameOnly} (x${item.quantity})`;
          }).join(', ');

          return `
            <tr>
              <td>
                <div style="font-weight: 600;">${escapeHTML(s.customer_name)}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${formatDate(s.created_at)}</div>
              </td>
              <td style="font-size: 13px; color: var(--text-secondary);">${itemsText}</td>
              <td style="font-weight: 600; color: var(--accent);">${formatIDR(s.total_price)}</td>
              <td style="text-align:right;">
                <div style="display:inline-flex; gap:6px;">
                  <button class="btn btn-secondary btn-icon-only" style="padding: 6px;" title="Lihat Struk" onclick="window.viewReceipt('${s.id}')">
                    <i data-lucide="receipt" style="width: 14px; height:14px;"></i>
                  </button>
                  <button class="btn btn-secondary btn-icon-only" style="padding: 6px;" title="Salin Rincian WA" onclick="window.copyWhatsAppText('${s.id}')">
                    <i data-lucide="copy" style="width: 14px; height:14px;"></i>
                  </button>
                </div>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

function renderFinancialChart() {
  const ctx = document.getElementById('financialChart');
  if (!ctx) return;

  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    last7Days.push(d.toISOString().split('T')[0]);
  }

  const labels = last7Days.map(d => formatDate(d));
  
  const incomeData = last7Days.map(dateStr => {
    const daySales = state.sales.filter(s => s.created_at.startsWith(dateStr));
    return daySales.reduce((sum, s) => sum + (parseFloat(s.total_price) || 0), 0);
  });

  const expenseData = last7Days.map(dateStr => {
    const dayExpenses = state.expenses.filter(e => e.date === dateStr);
    return dayExpenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  });

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(45, 31, 23, 0.08)';
  const textColor = isDark ? '#dfd4ca' : '#5c4e46';

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Pemasukan',
          data: incomeData,
          backgroundColor: '#4e7d4e',
          borderRadius: 6,
          borderWidth: 0
        },
        {
          label: 'Pengeluaran',
          data: expenseData,
          backgroundColor: '#c62828',
          borderRadius: 6,
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: { family: 'Montserrat', size: 12 },
            color: textColor
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'transparent' },
          ticks: { font: { family: 'Montserrat' }, color: textColor }
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            font: { family: 'Montserrat' },
            color: textColor,
            callback: function(value) {
              return value >= 1000000 ? (value / 1000000).toFixed(1) + 'M' : value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value;
            }
          }
        }
      }
    }
  });
}
// 2. SALES VIEW (DAFTAR PESANAN)
function renderSales(container, actionsContainer) {
  if (actionsContainer) actionsContainer.innerHTML = '';
  const btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.innerHTML = '<i data-lucide="plus"></i> Tambah Pesanan Baru';
  btn.addEventListener('click', () => openSaleModal());
  actionsContainer.appendChild(btn);

  if (!state.salesFilter) {
    state.salesFilter = { search: '', payment: 'all', delivery: 'all' };
  }

  const sales = state.sales;

  // Calculate metrics
  let totalRevenue = 0;
  let paidRevenue = 0;
  let unpaidRevenue = 0;
  sales.forEach(s => {
    const val = parseFloat(s.total_price) || 0;
    totalRevenue += val;
    if (s.payment_status === 'paid') {
      paidRevenue += val;
    } else {
      unpaidRevenue += val;
    }
  });

  // Apply filters
  const filteredSales = sales.filter(s => {
    const custMatch = s.customer_name.toLowerCase().includes(state.salesFilter.search.toLowerCase());
    const payMatch = state.salesFilter.payment === 'all' || s.payment_status === state.salesFilter.payment;
    const delMatch = state.salesFilter.delivery === 'all' || s.delivery_status === state.salesFilter.delivery;
    return custMatch && payMatch && delMatch;
  });

  container.innerHTML = `
    <!-- Metrics Summaries -->
    <div class="detail-summary-grid">
      <div class="detail-summary-card income">
        <div>
          <div class="title">Total Tagihan Kumulatif</div>
          <div class="value">${formatIDR(totalRevenue)}</div>
        </div>
        <i data-lucide="calculator" style="color: var(--primary); width: 32px; height: 32px;"></i>
      </div>
      <div class="detail-summary-card success">
        <div>
          <div class="title">Total Lunas</div>
          <div class="value" style="color: var(--success); margin-top: 4px;">${formatIDR(paidRevenue)}</div>
        </div>
        <i data-lucide="badge-check" style="color: var(--success); width: 32px; height: 32px;"></i>
      </div>
      <div class="detail-summary-card warning">
        <div>
          <div class="title">Belum Lunas</div>
          <div class="value" style="color: var(--text-warning); margin-top: 4px;">${formatIDR(unpaidRevenue)}</div>
        </div>
        <i data-lucide="alert-circle" style="color: var(--text-warning); width: 32px; height: 32px;"></i>
      </div>
    </div>

    <!-- Filter Control Panel -->
    <div class="filter-panel">
      <div class="form-row-3">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 12px; margin-bottom: 4px;">Cari Pelanggan</label>
          <input type="text" id="filter-sales-search" class="form-control" placeholder="Nama pelanggan..." value="${escapeHTML(state.salesFilter.search || '')}">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 12px; margin-bottom: 4px;">Status Bayar</label>
          <select id="filter-sales-payment" class="form-control">
            <option value="all" ${state.salesFilter.payment === 'all' ? 'selected' : ''}>Semua Pembayaran</option>
            <option value="paid" ${state.salesFilter.payment === 'paid' ? 'selected' : ''}>Lunas</option>
            <option value="unpaid" ${state.salesFilter.payment === 'unpaid' ? 'selected' : ''}>Belum Bayar</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" style="font-size: 12px; margin-bottom: 4px;">Status Kirim</label>
          <select id="filter-sales-delivery" class="form-control">
            <option value="all" ${state.salesFilter.delivery === 'all' ? 'selected' : ''}>Semua Pengiriman</option>
            <option value="pending" ${state.salesFilter.delivery === 'pending' ? 'selected' : ''}>Menunggu</option>
            <option value="shipped" ${state.salesFilter.delivery === 'shipped' ? 'selected' : ''}>Dikirim</option>
            <option value="delivered" ${state.salesFilter.delivery === 'delivered' ? 'selected' : ''}>Diterima</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Sales Table -->
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Daftar Transaksi Pesanan</h3>
          <p class="panel-subtitle">Log transaksi masuk ${filteredSales.length} dari total ${sales.length} pesanan</p>
        </div>
      </div>
      <div class="table-wrapper">
        ${renderSalesTable(filteredSales)}
      </div>
    </div>
  `;

  // Attach search/filter event listeners
  const searchInput = document.getElementById('filter-sales-search');
  const payFilter = document.getElementById('filter-sales-payment');
  const delFilter = document.getElementById('filter-sales-delivery');

  const onFilterChange = () => {
    state.salesFilter.search = searchInput.value;
    state.salesFilter.payment = payFilter.value;
    state.salesFilter.delivery = delFilter.value;
    renderSales(container, actionsContainer);
  };

  searchInput.addEventListener('input', onFilterChange);
  payFilter.addEventListener('change', onFilterChange);
  delFilter.addEventListener('change', onFilterChange);

  // Register Row Action Handlers
  window.changePaymentStatus = async (saleId, newStatus) => {
    try {
      await window.db.updateSale(saleId, { payment_status: newStatus });
      showToast('Status pembayaran berhasil diperbarui.', 'success');
      await refreshData();
      renderSales(container, actionsContainer);
    } catch (err) {
      showToast(err.message, 'danger');
    }
  };

  window.changeDeliveryStatus = async (saleId, newStatus) => {
    try {
      await window.db.updateSale(saleId, { delivery_status: newStatus });
      showToast('Status pengiriman berhasil diperbarui.', 'success');
      await refreshData();
      renderSales(container, actionsContainer);
    } catch (err) {
      showToast(err.message, 'danger');
    }
  };

  window.editSale = (saleId) => {
    const saleObj = state.sales.find(s => s.id === saleId);
    if (saleObj) {
      openSaleModal(saleObj);
    }
  };

  window.deleteSaleConfirm = async (saleId) => {
    if (confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
      try {
        await window.db.deleteSale(saleId);
        showToast('Pesanan berhasil dihapus.', 'success');
        await refreshData();
        renderSales(container, actionsContainer);
      } catch (err) {
        showToast(err.message, 'danger');
      }
    }
  };

  window.sendWASaleReceipt = async (saleId) => {
    try {
      showToast('Menghubungkan ke WhatsApp Evolution API...', 'info');
      const sent = await sendWhatsAppReceipt(saleId);
      if (sent) {
        showToast('Berhasil mengirim struk via WhatsApp!', 'success');
      } else {
        showToast('Gagal mengirim WhatsApp. Cek konfigurasi atau log API.', 'warning');
      }
    } catch (err) {
      console.error('WA API Error:', err);
      if (err.message.includes('belum terdaftar')) {
        showToast('Gagal: Nomor WhatsApp pelanggan belum terdaftar.', 'warning');
      } else {
        showToast(`Gagal kirim WA API: ${err.message}. Klik di sini untuk kirim manual.`, 'warning');
        setTimeout(() => {
          const toasts = document.querySelectorAll('.toast-warning');
          const lastToast = toasts[toasts.length - 1];
          if (lastToast) {
            lastToast.style.cursor = 'pointer';
            lastToast.title = 'Klik untuk mengirim manual';
            lastToast.onclick = () => {
              sendWhatsAppMessage(saleId);
              lastToast.remove();
            };
          }
        }, 100);
      }
    }
  };

  // Re-initialize Lucide
  lucide.createIcons();
}

function renderSalesTable(sales) {
  if (sales.length === 0) {
    return `
      <div class="empty-state" style="padding: 40px 20px;">
        <p>Belum ada transaksi pesanan yang sesuai dengan filter.</p>
      </div>
    `;
  }

  return `
    <table class="table-custom">
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Pelanggan</th>
          <th>Daftar Belanja Paket</th>
          <th>Total Harga</th>
          <th>Pembayaran</th>
          <th>Pengiriman</th>
          <th style="text-align:right;">Aksi</th>
        </tr>
      </thead>
      <tbody>
        ${sales.map(s => {
          let items = [];
          if (s.items) {
            items = typeof s.items === 'string' ? JSON.parse(s.items) : s.items;
          }
          if (!Array.isArray(items) || items.length === 0) {
            items = [{ package_id: s.package_id, quantity: s.quantity }];
          }

          const itemsText = items.map(item => {
            const pkg = state.packages[item.package_id];
            const name = pkg ? pkg.name : item.package_id;
            return `<span style="display:inline-block; background:rgba(255,255,255,0.05); padding:2px 6px; border-radius:4px; margin:2px; font-size:12px;">${name} <strong>x${item.quantity}</strong></span>`;
          }).join(' ');

          const customerObj = state.customers.find(c => c.name.toLowerCase() === s.customer_name.toLowerCase());
          const hasWA = customerObj && customerObj.phone;
          const tier = customerObj ? customerObj.tier || 'BRONZE' : 'BRONZE';
          const tierLabel = window.MEMBER_TIERS[tier] ? window.MEMBER_TIERS[tier].name : 'Bronze';
          const badgeClass = window.MEMBER_TIERS[tier] ? window.MEMBER_TIERS[tier].badgeClass : 'badge-secondary';

          return `
            <tr>
              <td style="font-size: 12px; color: var(--text-secondary);">${formatDate(s.created_at)}</td>
              <td>
                <div style="font-weight:600;">${escapeHTML(s.customer_name)}</div>
                <div style="font-size:11px; margin-top:2px;">
                  <span class="badge ${badgeClass}">${tierLabel}</span>
                  ${hasWA ? `<span style="color:var(--success); margin-left:4px;"><i data-lucide="phone" style="width:10px; height:10px; display:inline-block; vertical-align:middle; margin-right:2px;"></i>${customerObj.phone}</span>` : ''}
                </div>
              </td>
              <td>${itemsText}</td>
              <td style="font-weight: 700; color: var(--accent);">${formatIDR(s.total_price)}</td>
              <td>
                <select class="form-control" style="padding: 4px 8px; font-size: 13px; width: auto; display: inline-block; ${s.payment_status === 'paid' ? 'border-color:var(--success); color:var(--success);' : 'border-color:var(--danger); color:var(--danger);'}" onchange="window.changePaymentStatus('${s.id}', this.value)">
                  <option value="unpaid" ${s.payment_status === 'unpaid' ? 'selected' : ''}>Belum Bayar</option>
                  <option value="paid" ${s.payment_status === 'paid' ? 'selected' : ''}>Lunas</option>
                </select>
              </td>
              <td>
                <select class="form-control" style="padding: 4px 8px; font-size: 13px; width: auto; display: inline-block;" onchange="window.changeDeliveryStatus('${s.id}', this.value)">
                  <option value="pending" ${s.delivery_status === 'pending' ? 'selected' : ''}>Menunggu</option>
                  <option value="shipped" ${s.delivery_status === 'shipped' ? 'selected' : ''}>Dikirim</option>
                  <option value="delivered" ${s.delivery_status === 'delivered' ? 'selected' : ''}>Diterima</option>
                </select>
              </td>
              <td style="text-align:right;">
                <div style="display:inline-flex; gap:6px;">
                  <button class="btn btn-success btn-icon-only" style="padding: 6px; background-color: var(--success); border-color: var(--success);" title="Kirim Struk WA" onclick="window.sendWASaleReceipt('${s.id}')">
                    <i data-lucide="message-square" style="width: 14px; height: 14px;"></i>
                  </button>
                  <button class="btn btn-secondary btn-icon-only" style="padding: 6px;" title="Cetak Struk" onclick="window.navigate('receipt', { saleId: '${s.id}' })">
                    <i data-lucide="receipt" style="width: 14px; height: 14px;"></i>
                  </button>
                  <button class="btn btn-secondary btn-icon-only" style="padding: 6px;" title="Edit" onclick="window.editSale('${s.id}')">
                    <i data-lucide="edit-3" style="width: 14px; height: 14px;"></i>
                  </button>
                  <button class="btn btn-danger btn-icon-only" style="padding: 6px;" title="Hapus" onclick="window.deleteSaleConfirm('${s.id}')">
                    <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                  </button>
                </div>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}
// 4. KELOLA PAKET VIEW
function renderPackages(container, actionsContainer) {
  if (actionsContainer) actionsContainer.innerHTML = '';
  const btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.innerHTML = '<i data-lucide="plus"></i> Tambah Paket Baru';
  btn.addEventListener('click', () => openPackageModal());
  actionsContainer.appendChild(btn);

  if (Object.keys(state.packages).length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i data-lucide="package"></i>
        <h3>Belum Ada Paket</h3>
        <p>Silakan buat paket pempek baru untuk didaftarkan dalam penjualan.</p>
        <button class="btn btn-primary" onclick="window.openPackageModal()">Tambah Paket Pertama</button>
      </div>
    `;
    return;
  }

  let html = `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Daftar Paket Penjualan</h3>
          <p class="panel-subtitle">Menu paket pempek aktif beserta komposisi butirannya</p>
        </div>
      </div>
      <div class="table-wrapper">
        <table class="table-custom">
          <thead>
            <tr>
              <th>Kode</th>
              <th>Nama Paket</th>
              <th>Harga</th>
              <th>Komposisi Pempek (Butir)</th>
              <th style="text-align:right;">Aksi</th>
            </tr>
          </thead>
          <tbody>
  `;

  Object.keys(state.packages).forEach(id => {
    const pkg = state.packages[id];
    
    let comp = pkg.composition;
    if (typeof comp === 'string') {
      try { comp = JSON.parse(comp); } catch { comp = {}; }
    }

    const compDetails = Object.keys(comp)
      .filter(itemKey => comp[itemKey] > 0)
      .map(itemKey => {
        const label = window.ITEM_LABELS[itemKey] || itemKey.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return `${label}: ${comp[itemKey]} pcs`;
      })
      .join(', ');

    html += `
      <tr>
        <td style="font-weight: 700; color: var(--primary);">${escapeHTML(id)}</td>
        <td style="font-weight: 600;">${escapeHTML(pkg.name)}</td>
        <td style="font-weight: 700; color: var(--accent);">${formatIDR(pkg.price)}</td>
        <td style="font-size: 13px; color: var(--text-secondary);">${compDetails || 'Kosong'}</td>
        <td style="text-align:right;">
          <div style="display:inline-flex; gap:6px;">
            <button class="btn btn-secondary btn-icon-only" style="padding: 6px;" title="Edit Paket" onclick="window.editPackage('${id}')">
              <i data-lucide="edit-3" style="width: 14px; height: 14px;"></i>
            </button>
            <button class="btn btn-danger btn-icon-only" style="padding: 6px;" title="Hapus Paket" onclick="window.deletePackageConfirm('${id}')">
              <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  html += `
          </tbody>
        </table>
      </div>
    </div>
  `;
  container.innerHTML = html;

  window.editPackage = (id) => {
    const pkg = state.packages[id];
    if (pkg) {
      openPackageModal(id, pkg);
    }
  };

  window.deletePackageConfirm = async (id) => {
    if (confirm(`Apakah Anda yakin ingin menghapus Paket "${id}"? Paket ini tidak akan bisa dipilih untuk transaksi baru.`)) {
      try {
        await window.db.deletePackage(id);
        showToast(`Paket "${id}" berhasil dihapus.`, 'success');
        await refreshData();
        renderPackages(container, actionsContainer);
      } catch (err) {
        showToast(err.message, 'danger');
      }
    }
  };
}

// 5. EXPENSES VIEW
function renderExpenses(container, actionsContainer) {
  if (actionsContainer) actionsContainer.innerHTML = '';
  const btn = document.createElement('button');
  btn.className = 'btn btn-accent';
  btn.innerHTML = '<i data-lucide="plus"></i> Catat Pengeluaran';
  btn.addEventListener('click', () => openExpenseModal());
  actionsContainer.appendChild(btn);

  let totalEx = 0;
  state.expenses.forEach(e => totalEx += parseFloat(e.amount) || 0);

  container.innerHTML = `
    <!-- Top Expense Overview -->
    <div class="card-grid" style="grid-template-columns: 1fr; max-width: 400px; margin-bottom: 24px;">
      <div class="card card-danger">
        <div class="card-header-icon">
          <i data-lucide="receipt"></i>
        </div>
        <div class="card-subtitle">Total Pengeluaran Kumulatif</div>
        <div class="card-title">${formatIDR(totalEx)}</div>
        <div class="card-meta">
          Jumlah total catatan: ${state.expenses.length} item
        </div>
      </div>
    </div>

    <!-- Expenses History Panel -->
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Riwayat Semua Pengeluaran</h3>
          <p class="panel-subtitle">Seluruh pengeluaran operasional dan bahan baku</p>
        </div>
      </div>
      
      <div class="table-wrapper">
        ${renderAllExpensesTable()}
      </div>
    </div>
  `;

  window.deleteExpenseConfirm = async (expenseId) => {
    if (confirm('Apakah Anda yakin ingin menghapus catatan pengeluaran ini?')) {
      try {
        await window.db.deleteExpense(expenseId);
        showToast('Pengeluaran berhasil dihapus.', 'success');
        await refreshData();
        renderExpenses(container, actionsContainer);
      } catch (err) {
        showToast(err.message, 'danger');
      }
    }
  };

  lucide.createIcons();
}

function renderAllExpensesTable() {
  if (state.expenses.length === 0) {
    return `
      <div class="empty-state" style="padding: 60px 20px;">
        <i data-lucide="receipt"></i>
        <h3>Belum Ada Pengeluaran</h3>
        <p>Silakan klik tombol "Catat Pengeluaran" di atas untuk mencatatkan pengeluaran baru.</p>
      </div>
    `;
  }

  const categoryLabels = {
    raw_material: 'Bahan Baku',
    packaging: 'Kemasan',
    operational: 'Operasional',
    marketing: 'Pemasaran',
    other: 'Lain-lain'
  };

  return `
    <table class="table-custom">
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Kategori</th>
          <th>Deskripsi</th>
          <th>Jumlah</th>
          <th style="text-align:right;">Aksi</th>
        </tr>
      </thead>
      <tbody>
        ${state.expenses.map(e => {
          const catLabel = categoryLabels[e.category] || e.category;
          return `
            <tr>
              <td>${formatDate(e.date)}</td>
              <td><span class="badge badge-secondary">${escapeHTML(catLabel)}</span></td>
              <td>${escapeHTML(e.description)}</td>
              <td style="font-weight: 600; color: var(--danger);">${formatIDR(e.amount)}</td>
              <td style="text-align:right;">
                <button class="btn btn-danger btn-icon-only" style="padding: 6px;" title="Hapus Pengeluaran" onclick="window.deleteExpenseConfirm('${e.id}')">
                  <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                </button>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}
// 6. CUSTOMERS VIEW (REKAP PELANGGAN)
function renderCustomers(container, actionsContainer) {
  if (actionsContainer) actionsContainer.innerHTML = '';
  // Tambahkan tombol di header
  const btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.innerHTML = '<i data-lucide="plus"></i> Tambah Pelanggan';
  btn.addEventListener('click', () => openCustomerModal());
  actionsContainer.appendChild(btn);

  // Hitung agregasi per pelanggan dari database state.customers
  const customerList = state.customers.map(c => {
    // Cari semua transaksi dari pelanggan ini (case-insensitive)
    const customerSales = state.sales.filter(s => s.customer_name.trim().toLowerCase() === c.name.trim().toLowerCase());
    
    let totalSpent = 0;
    let ordersCount = 0;
    const packagesMap = {};
    let lastOrder = null;

    customerSales.forEach(s => {
      totalSpent += parseFloat(s.total_price) || 0;
      
      let items = [];
      if (s.items) {
        items = typeof s.items === 'string' ? JSON.parse(s.items) : s.items;
      }
      if (!Array.isArray(items) || items.length === 0) {
        items = [{ package_id: s.package_id, quantity: s.quantity }];
      }
      
      items.forEach(item => {
        const qty = parseInt(item.quantity) || 1;
        ordersCount += qty;
        packagesMap[item.package_id] = (packagesMap[item.package_id] || 0) + qty;
      });

      if (!lastOrder || new Date(s.created_at) > new Date(lastOrder)) {
        lastOrder = s.created_at;
      }
    });

    const packDesc = Object.keys(packagesMap).map(pkgId => {
      const p = state.packages[pkgId];
      const pName = p ? p.name.split(' (')[0] : `Paket ${pkgId}`;
      return `${pName} (${packagesMap[pkgId]}x)`;
    }).join(', ');

    return {
      id: c.id,
      name: c.name,
      phone: c.phone || '',
      totalSpent,
      ordersCount,
      packDesc,
      lastOrder
    };
  }).sort((a, b) => b.totalSpent - a.totalSpent);

  container.innerHTML = `
    <!-- Customer Stats Banner -->
    <div class="card-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); margin-bottom: 24px;">
      <div class="card card-primary">
        <div class="card-header-icon">
          <i data-lucide="users"></i>
        </div>
        <div class="card-subtitle">Total Pelanggan Terdaftar</div>
        <div class="card-title">${customerList.length} Pembeli</div>
        <div class="card-meta">Daftar pelanggan aktif di database</div>
      </div>
    </div>

    <!-- Customers Table Panel -->
    <div class="panel">
      <div class="panel-header" style="flex-wrap: wrap; gap: 16px;">
        <div>
          <h3 class="panel-title">Rekap Transaksi & Data Pelanggan</h3>
          <p class="panel-subtitle">Kelola informasi pelanggan terdaftar beserta total belanjanya</p>
        </div>
        <div>
          <input type="text" id="search-customer" class="form-control" placeholder="Cari ID atau nama pembeli..." style="width: 250px; font-size: 13px; padding: 8px 12px;">
        </div>
      </div>

      <div class="table-wrapper">
        <table class="table-custom" id="table-customers-list">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Pelanggan</th>
              <th>WhatsApp</th>
              <th>Total Transaksi (Pcs Paket)</th>
              <th>Varian Paket yang Dibeli</th>
              <th>Total Belanja</th>
              <th>Transaksi Terakhir</th>
              <th style="text-align:right;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${customerList.length === 0 ? `
              <tr>
                <td colspan="8" style="text-align: center; padding: 40px 20px;">Belum ada data pelanggan terdaftar.</td>
              </tr>
            ` : customerList.map(c => `
                <tr class="customer-row-item">
                  <td style="font-weight: 700; font-family: monospace; color: var(--primary);" class="cust-id-col">${escapeHTML(c.id)}</td>
                  <td style="font-weight: 700;" class="cust-name-col">${escapeHTML(c.name)}</td>
                  <td style="font-size: 13px;">${c.phone ? `<a href="https://wa.me/${formatWhatsAppNumber(c.phone)}" target="_blank" style="display:inline-flex; align-items:center; gap:6px; color: var(--accent); font-weight:600;"><i data-lucide="send" style="width:12px; height:12px;"></i> ${escapeHTML(c.phone)}</a>` : '<span style="color:var(--text-muted); font-style:italic;">Belum diisi</span>'}</td>
                  <td>${c.ordersCount} Paket</td>
                  <td style="font-size: 13px; color: var(--text-secondary);">${c.packDesc || '<span style="color:var(--text-muted); font-style:italic;">Belum ada pesanan</span>'}</td>
                  <td style="font-weight: 700; color: var(--accent);">${formatIDR(c.totalSpent)}</td>
                  <td>${c.lastOrder ? formatDate(c.lastOrder) : '-'}</td>
                  <td style="text-align:right;">
                    <div style="display:inline-flex; gap:6px;">
                      <button class="btn btn-secondary btn-icon-only" style="padding: 6px;" title="Edit Pelanggan" onclick="window.editCustomer('${c.id}')">
                        <i data-lucide="edit-3" style="width: 14px; height: 14px;"></i>
                      </button>
                      <button class="btn btn-danger btn-icon-only" style="padding: 6px;" title="Hapus Pelanggan" onclick="window.deleteCustomerConfirm('${c.id}', '${escapeHTML(c.name)}')">
                        <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Search input handler
  const searchInput = document.getElementById('search-customer');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.customer-row-item').forEach(row => {
        const idText = row.querySelector('.cust-id-col').textContent.toLowerCase();
        const nameText = row.querySelector('.cust-name-col').textContent.toLowerCase();
        if (idText.includes(q) || nameText.includes(q)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  // Lucide icons render
  lucide.createIcons();
}

// 7. SETTINGS VIEW (PENGATURAN CLOUD)
function renderSettings(container, actionsContainer) {
  const currentConfig = window.db.getCloudConfig();
  const currentWASettings = window.db.getWASettings();
  const isCloud = window.db.isCloudActive();

  container.innerHTML = `
    <div class="panel-grid half-columns">
      <!-- Form Konfigurasi Cloud -->
      <div class="panel">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">Sambungkan Database Cloud</h3>
            <p class="panel-subtitle">Gunakan Supabase untuk menyimpan data secara online</p>
          </div>
        </div>
        
        <form id="form-cloud-settings">
          <div class="form-group">
            <label class="form-label" for="cloud-url">Supabase API URL</label>
            <input type="url" id="cloud-url" class="form-control" placeholder="Contoh: https://xxxx.supabase.co" required value="${currentConfig ? currentConfig.url : ''}">
          </div>
          
          <div class="form-group">
            <label class="form-label" for="cloud-key">Supabase Anon Key</label>
            <input type="password" id="cloud-key" class="form-control" placeholder="Masukkan Supabase Public Anon Key" required value="${currentConfig ? currentConfig.key : ''}">
          </div>

          <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 12px;">
            <button type="submit" class="btn btn-primary" style="width: 100%;">
              <i data-lucide="link"></i> Simpan & Hubungkan
            </button>
            ${isCloud ? `
              <button type="button" class="btn btn-danger" id="btn-disconnect-cloud" style="width: 100%;">
                <i data-lucide="link-2"></i> Putuskan Hubungan Cloud
              </button>
              <button type="button" class="btn btn-accent" id="btn-sync-local" style="width: 100%;">
                <i data-lucide="refresh-cw"></i> Unggah & Sinkronkan Data Lokal ke Cloud
              </button>
            ` : ''}
          </div>
        </form>
      </div>

      <!-- Form Konfigurasi WhatsApp API -->
      <div class="panel">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">Pengaturan WhatsApp Evolution API</h3>
            <p class="panel-subtitle">Konfigurasikan Evolution API untuk pengiriman struk otomatis</p>
          </div>
        </div>
        
        <form id="form-wa-settings">
          <div class="form-group">
            <label class="form-label" for="wa-url">Evolution API URL</label>
            <input type="url" id="wa-url" class="form-control" placeholder="Contoh: http://localhost:8080" required value="${currentWASettings ? currentWASettings.url : ''}">
          </div>
          
          <div class="form-group">
            <label class="form-label" for="wa-instance">Nama Instance</label>
            <input type="text" id="wa-instance" class="form-control" placeholder="Contoh: instance-name" required value="${currentWASettings ? currentWASettings.instance : ''}">
          </div>
          
          <div class="form-group">
            <label class="form-label" for="wa-key">API Key / Secret Key</label>
            <input type="password" id="wa-key" class="form-control" placeholder="Masukkan API Key" required value="${currentWASettings ? currentWASettings.apiKey : ''}">
          </div>
          
          <div class="form-group" style="display: flex; align-items: center; gap: 8px;">
            <input type="checkbox" id="wa-autosend" ${currentWASettings && currentWASettings.autoSend ? 'checked' : ''} style="width: 16px; height: 16px; margin: 0;">
            <label class="form-label" for="wa-autosend" style="margin-bottom: 0; cursor: pointer; font-size: 13px; font-weight: 500;">Kirim Struk WhatsApp Otomatis</label>
          </div>

          <div style="margin-top: 24px; display: flex; gap: 12px;">
            <button type="button" class="btn btn-secondary" onclick="window.checkWAConnection()" style="flex: 1;">
              <i data-lucide="activity"></i> Tes Koneksi
            </button>
            <button type="submit" class="btn btn-success" style="flex: 1;">
              <i data-lucide="save"></i> Simpan Konfigurasi WA
            </button>
          </div>
        </form>
      </div>

      <!-- Form Konfigurasi Modal Usaha -->
      <div class="panel">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">Pengaturan Modal Usaha</h3>
            <p class="panel-subtitle">Konfigurasikan Modal Awal untuk kalkulasi Saldo Keuangan</p>
          </div>
        </div>
        <form id="form-modal-settings">
          <div class="form-group">
            <label class="form-label" for="modal-awal">Modal Awal (IDR)</label>
            <input type="number" id="modal-awal" class="form-control" placeholder="Contoh: 10000000" required value="${window.db.getModalAwal()}">
          </div>
          <div style="margin-top: 24px;">
            <button type="submit" class="btn btn-primary" style="width: 100%;">
              <i data-lucide="save"></i> Simpan Modal Awal
            </button>
          </div>
        </form>
      </div>

      <!-- Panduan Setup & Schema -->
      <div class="panel" style="grid-column: span 2;">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">Panduan Konfigurasi Supabase</h3>
            <p class="panel-subtitle">Langkah setup database online Anda</p>
          </div>
        </div>
        <div style="font-size: 14px; line-height: 1.6;">
          <ol style="margin-left: 20px; margin-bottom: 20px; display: flex; flex-direction: column; gap: 8px;">
            <li>Daftar akun gratis di <a href="https://supabase.com" target="_blank" style="font-weight: 600;">supabase.com</a>.</li>
            <li>Buat Project baru (misal: "Pempek Cek Boya").</li>
            <li>Masuk ke menu <strong>SQL Editor</strong> di dashboard Supabase Anda.</li>
            <li>Salin skrip SQL di bawah ini dan jalankan (Klik <strong>Run</strong>).</li>
            <li>Salin <strong>Project URL</strong> & <strong>Anon Key</strong> dari menu <strong>Project Settings -> API</strong>, lalu masukkan di form sebelah kiri.</li>
          </ol>
          
          <div class="panel-title" style="font-size:14px; margin-bottom: 8px;">Skrip SQL SQL Editor:</div>
          <div class="code-block-container">
            <button class="copy-btn" id="btn-copy-sql">Salin SQL</button>
            <pre id="sql-script-pre">-- 1. Buat Tabel Customers (Database Pelanggan)
CREATE TABLE IF NOT EXISTS customers (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Buat Tabel Packages
CREATE TABLE IF NOT EXISTS packages (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price NUMERIC NOT NULL,
  composition JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Buat Tabel Batches
CREATE TABLE IF NOT EXISTS batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  closed_at TIMESTAMP WITH TIME ZONE
);

-- 4. Buat Tabel Sales
CREATE TABLE IF NOT EXISTS sales (
  id VARCHAR(50) PRIMARY KEY,
  batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
  customer_name VARCHAR(255) NOT NULL,
  package_id VARCHAR(50) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  total_price NUMERIC NOT NULL,
  payment_status VARCHAR(50) NOT NULL DEFAULT 'unpaid',
  delivery_status VARCHAR(50) NOT NULL DEFAULT 'pending',
  notes TEXT,
  items JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Buat Tabel Expenses
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Nonaktifkan RLS (Row Level Security) agar database cloud dapat diakses langsung oleh aplikasi
ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE packages DISABLE ROW LEVEL SECURITY;
ALTER TABLE batches DISABLE ROW LEVEL SECURITY;
ALTER TABLE sales DISABLE ROW LEVEL SECURITY;
ALTER TABLE expenses DISABLE ROW LEVEL SECURITY;</pre>
          </div>
        </div>
      </div>
    </div>
  `;

  // Submit Cloud Form handler
  const formSettings = document.getElementById('form-cloud-settings');
  formSettings.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('cloud-url').value.trim();
    const key = document.getElementById('cloud-key').value.trim();

    window.db.saveCloudConfig(url, key);
    showToast('Menghubungkan ke Supabase...', 'info');

    const status = await window.db.init();
    state.cloudConnected = status.connected;
    updateCloudIndicator(status);

    if (status.connected) {
      showToast('Koneksi database cloud berhasil disimpan!', 'success');
      await refreshData();
      navigate('settings');
    } else {
      showToast(`Gagal terhubung: ${status.error}`, 'danger');
    }
  });

  // Submit WA Form handler
  const formWASettings = document.getElementById('form-wa-settings');
  if (formWASettings) {
    formWASettings.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = document.getElementById('wa-url').value.trim();
      const instance = document.getElementById('wa-instance').value.trim();
      const apiKey = document.getElementById('wa-key').value.trim();
      const autoSend = document.getElementById('wa-autosend').checked;

      window.db.saveWASettings(url, instance, apiKey, autoSend);
      showToast('Konfigurasi WhatsApp Evolution API berhasil disimpan!', 'success');
      navigate('settings');
    });
  }

  // Submit Modal Awal Form handler
  const formModalSettings = document.getElementById('form-modal-settings');
  if (formModalSettings) {
    formModalSettings.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = parseFloat(document.getElementById('modal-awal').value) || 0;
      window.db.saveModalAwal(val);
      showToast('Modal Awal berhasil disimpan!', 'success');
      navigate('settings');
    });
  }

  // Disconnect Cloud button handler
  const btnDisconnect = document.getElementById('btn-disconnect-cloud');
  if (btnDisconnect) {
    btnDisconnect.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin memutuskan koneksi Cloud?')) {
        window.db.clearCloudConfig();
        state.cloudConnected = false;
        updateCloudIndicator({ connected: false, msg: 'Menggunakan penyimpanan lokal.' });
        showToast('Koneksi cloud diputuskan.', 'info');
        refreshData().then(() => navigate('settings'));
      }
    });
  }

  // Sync Local button handler
  const btnSyncLocal = document.getElementById('btn-sync-local');
  if (btnSyncLocal) {
    btnSyncLocal.addEventListener('click', async () => {
      try {
        showToast('Memulai sinkronisasi data lokal ke cloud...', 'info');
        const res = await window.db.syncLocalToCloud();
        if (res.success) {
          showToast(res.msg, 'success');
          await refreshData();
          navigate('settings');
        } else {
          showToast(res.msg, 'warning');
        }
      } catch (err) {
        showToast(err.message, 'danger');
      }
    });
  }
}

function renderReceipt(container, actionsContainer, saleId) {
  const sale = state.sales.find(s => s.id === saleId);
  if (!sale) {
    showToast('Transaksi tidak ditemukan.', 'danger');
    navigate('dashboard');
    return;
  }

  const batch = state.batches.find(b => b.id === sale.batch_id);
  const batchName = batch ? batch.name : '-';

  let items = [];
  if (sale.items) {
    items = typeof sale.items === 'string' ? JSON.parse(sale.items) : sale.items;
  }
  if (!Array.isArray(items) || items.length === 0) {
    items = [{ package_id: sale.package_id, quantity: sale.quantity }];
  }

  const itemsHtml = items.map(item => {
    const pkg = state.packages[item.package_id];
    const nameOnly = pkg ? pkg.name.split(' (')[0] : `Paket ${item.package_id}`;
    const unitPrice = item.price || (pkg ? pkg.price : 0);
    const subtotal = unitPrice * item.quantity;
    return `
      <div class="item-row">
        <div class="col-name">
          <span class="item-title">${escapeHTML(nameOnly)}</span>
          <span class="item-unit-price">${formatIDR(unitPrice)}</span>
        </div>
        <div class="col-qty">x${item.quantity}</div>
        <div class="col-price">${formatIDR(subtotal)}</div>
      </div>
    `;
  }).join('');

    container.innerHTML = `
    <div class="receipt-view-wrapper">
      <!-- Receipt Action Toolbar (Hidden in print) -->
      <div class="receipt-actions" style="margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;">
        <button class="btn btn-secondary" onclick="window.closeReceiptView()" style="min-width: 120px;">
          <i data-lucide="arrow-left"></i> Kembali
        </button>
        <button class="btn btn-primary" onclick="window.print()" style="min-width: 120px;">
          <i data-lucide="printer"></i> Cetak (PDF)
        </button>
        <button class="btn btn-secondary" onclick="window.downloadReceiptImage('${sale.id}')" style="min-width: 120px;">
          <i data-lucide="download"></i> Simpan PNG
        </button>
        <button class="btn btn-secondary" onclick="window.copyReceiptImageToClipboard('${sale.id}')" style="min-width: 120px;">
          <i data-lucide="copy"></i> Salin Gambar
        </button>
        <button class="btn btn-accent" onclick="window.sendWhatsAppMessage('${sale.id}')" style="min-width: 140px;">
          <i data-lucide="message-square"></i> Kirim WA (Teks)
        </button>
        <button class="btn btn-accent" onclick="window.sendReceiptImageWhatsApp('${sale.id}')" style="min-width: 140px;">
          <i data-lucide="send"></i> Kirim WA (Gambar)
        </button>
      </div>

      <!-- Physical Receipt Container -->
      <div class="receipt-container">
        <div class="receipt-paper">
          <!-- Logo Pempek Cek Boya -->
          <div class="receipt-logo">
            <img src="${LOGO_BASE64}" alt="Logo Pempek Cek Boya">
          </div>
          
          <!-- Brand Name & Tagline -->
          <div class="receipt-header">
            <h2>PEMPEK CEK BOYA</h2>
            <p>Enak, Bersih, Berprotein!</p>
          </div>
          
          <div class="receipt-divider"></div>
          
          <!-- Receipt Details Info -->
          <div class="receipt-meta">
            <div class="meta-row">
              <span class="label">Pelanggan:</span>
              <span class="value">${escapeHTML(sale.customer_name)}</span>
            </div>
            <div class="meta-row">
              <span class="label">Tanggal:</span>
              <span class="value">${formatDate(sale.created_at)}</span>
            </div>
            <div class="meta-row">
              <span class="label">Batch:</span>
              <span class="value">${escapeHTML(batchName)}</span>
            </div>
            <div class="meta-row">
              <span class="label">ID Transaksi:</span>
              <span class="value" style="font-size:10px; color:var(--text-muted); font-family:monospace;">${sale.id}</span>
            </div>
          </div>
          
          <div class="receipt-divider"></div>
          
          <!-- Items List -->
          <div class="receipt-items">
            <div class="items-header">
              <span class="col-name">Paket</span>
              <span class="col-qty">Qty</span>
              <span class="col-price">Total</span>
            </div>
            <div class="receipt-divider-thin"></div>
            ${itemsHtml}
          </div>
          
          <div class="receipt-divider"></div>
          
          <!-- Total Price -->
          <div class="receipt-total">
            <div class="total-row">
              <span class="total-label">TOTAL TAGIHAN</span>
              <span class="total-val">${formatIDR(sale.total_price)}</span>
            </div>
            <div class="receipt-divider-thin"></div>
            <div class="payment-info" style="margin-top: 10px; text-align: center; font-size: 12px; line-height: 1.5; color: #1f2937;">
              <span style="display: block; font-weight: 600; color: #4b5563; margin-bottom: 2px;">Pembayaran transfer ke:</span>
              <span style="display: block; font-weight: 700; font-size: 13px; color: #111827;">Seabank a.n Nabilah</span>
              <span style="display: block; font-family: monospace; font-size: 15px; font-weight: 700; color: #0284c7; letter-spacing: 0.5px; margin-top: 2px;">901017363150</span>
            </div>
          </div>
          
          ${sale.notes ? `
            <div class="receipt-divider-thin"></div>
            <div class="receipt-notes">
              <strong style="display:block; margin-bottom:4px; font-size:11px;">Catatan:</strong>
              <p style="font-size:11px; margin:0; line-height:1.4; color:#374151;">${escapeHTML(sale.notes)}</p>
            </div>
          ` : ''}
          
          <div class="receipt-divider"></div>
          
          <!-- Footer Thank You -->
          <div class="receipt-footer">
            <p>Mokaseh banyak</p>
            <p>Sudah memesan Pempek Cek Boya! Pempek wong kito galo~</p>
            <p style="font-size: 9px; margin-top: 8px; color: var(--text-muted);">Sistem Penjualan v1.0</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Re-initialize Lucide icons for buttons in the receipt view
  lucide.createIcons();
}

window.closeReceiptView = () => {
  // Clear the hash to go back to regular views without triggering hashchange reload
  window.history.pushState("", document.title, window.location.pathname + window.location.search);
  if (state.currentBatchId) {
    navigate('batch-details', { batchId: state.currentBatchId });
  } else {
    navigate('dashboard');
  }
};

// --- WHATSAPP NUMBER NORMALIZATION & MESSAGE ---
function formatWhatsAppNumber(phone) {
  if (!phone) return '';
  let clean = phone.replace(/[^0-9]/g, '');
  if (clean.startsWith('0')) {
    clean = '62' + clean.slice(1);
  }
  return clean;
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function generateWhatsAppText(sale) {
  return `*Terima kasih telah berbelanja di Pempek Cek Boya!* 🌸\n\nHalo *${sale.customer_name}*, pesanan Anda dengan nomor nota *${sale.id}* senilai *${formatIDR(sale.total_price)}* berhasil kami catat.\n\nMokaseh banyak, sudah memesan Pempek Cek Boya! Pempek wong kito galo~`;
}

function sendWhatsAppMessage(saleId) {
  const sale = state.sales.find(s => s.id === saleId);
  if (!sale) {
    showToast('Transaksi tidak ditemukan.', 'danger');
    return;
  }
  
  const cust = state.customers.find(c => c.name.toLowerCase() === sale.customer_name.toLowerCase());
  const phone = cust ? cust.phone : '';
  const cleanPhone = formatWhatsAppNumber(phone);
  
  if (!cleanPhone) {
    showToast('Nomor WhatsApp pelanggan belum terdaftar. Silakan edit pesanan untuk melengkapi nomor WA.', 'warning');
    return;
  }

  const text = generateWhatsAppText(sale);
  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/${cleanPhone}?text=${encodedText}`;
  
  window.open(url, '_blank');
}

async function generateReceiptCanvasSilent(sale) {
  let items = [];
  if (sale.items) {
    items = typeof sale.items === 'string' ? JSON.parse(sale.items) : sale.items;
  }
  if (!Array.isArray(items) || items.length === 0) {
    items = [{ package_id: sale.package_id, quantity: sale.quantity }];
  }

  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  tempDiv.style.width = '380px';
  tempDiv.style.backgroundColor = '#ffffff';
  tempDiv.style.padding = '20px';
  
  const batch = state.batches.find(b => b.id === sale.batch_id);
  const batchName = batch ? batch.name : 'Tanpa Batch';

  const itemsHtml = items.map(item => {
    const pkg = state.packages[item.package_id];
    const nameOnly = pkg ? pkg.name.split(' (')[0] : `Paket ${item.package_id}`;
    const unitPrice = item.price || (pkg ? pkg.price : 0);
    const subtotal = unitPrice * item.quantity;
    return `
      <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 5px; font-family: sans-serif; color: #111;">
        <div style="flex: 1; padding-right: 8px;">
          <span style="display: block; font-weight: 600;">${nameOnly}</span>
          <span style="font-size: 11px; color: #555;">${formatIDR(unitPrice)}</span>
        </div>
        <div style="width: 45px; text-align: center;">x${item.quantity}</div>
        <div style="width: 90px; text-align: right; font-weight: 500;">${formatIDR(subtotal)}</div>
      </div>
    `;
  }).join('');

  tempDiv.innerHTML = `
    <div style="font-family: sans-serif; color: #000000; line-height: 1.4; padding: 15px; background-color: #ffffff; border: 1px solid #eee; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 10px;">
        <img src="${LOGO_BASE64}" alt="Logo" style="max-height: 60px; max-width: 100px; object-fit: contain;">
      </div>
      
      <div style="text-align: center; margin-bottom: 12px;">
        <h2 style="margin: 0; font-size: 17px; font-weight: 700; color: #111; letter-spacing: 0.5px;">PEMPEK CEK BOYA</h2>
        <p style="margin: 2px 0 0 0; font-size: 12px; color: #555; font-style: italic;">Enak, Bersih, Berprotein!</p>
      </div>
      
      <div style="border-top: 1px dashed #bbb; margin: 10px 0;"></div>
      
      <div style="font-size: 12px; color: #333; margin-bottom: 10px; display: flex; flex-direction: column; gap: 3px;">
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #666;">Pelanggan:</span>
          <span style="font-weight: 600;">${sale.customer_name}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #666;">Tanggal:</span>
          <span>${formatDate(sale.created_at)}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #666;">ID Nota:</span>
          <span style="font-family: monospace; font-weight: 600;">${sale.id}</span>
        </div>
      </div>
      
      <div style="border-top: 1px dashed #bbb; margin: 10px 0;"></div>
      
      <div>
        <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: #111; margin-bottom: 6px;">
          <span style="flex: 1;">Paket</span>
          <span style="width: 45px; text-align: center;">Qty</span>
          <span style="width: 90px; text-align: right;">Total</span>
        </div>
        <div style="border-top: 1px dotted #ccc; margin: 5px 0;"></div>
        ${itemsHtml}
      </div>
      
      <div style="border-top: 1px dashed #bbb; margin: 10px 0;"></div>
      
      <div>
        <div style="display: flex; justify-content: space-between; font-size: 15px; font-weight: 700; color: #000;">
          <span>TOTAL TAGIHAN</span>
          <span>${formatIDR(sale.total_price)}</span>
        </div>
        <div style="border-top: 1px dashed #eee; margin: 8px 0;"></div>
        <div style="margin-top: 8px; text-align: center; font-size: 12px; color: #333; line-height: 1.5; background: #f9f9f9; padding: 10px; border-radius: 6px;">
          <span style="display: block; font-weight: 600; color: #666; margin-bottom: 2px;">Pembayaran transfer ke:</span>
          <span style="display: block; font-weight: 700; color: #111; font-size: 13px;">Seabank a.n Nabilah</span>
          <span style="display: block; font-family: monospace; font-size: 15px; font-weight: 700; color: #0284c7; letter-spacing: 0.5px; margin-top: 2px;">901017363150</span>
        </div>
      </div>
      
      ${sale.notes ? `
        <div style="border-top: 1px dotted #ccc; margin: 8px 0;"></div>
        <div style="font-size: 12px; color: #444; background: #fffbeb; padding: 8px; border-radius: 4px; border-left: 3px solid #fbbf24;">
          <strong style="display: block; margin-bottom: 2px;">Catatan:</strong>
          <span style="font-style: italic;">${sale.notes}</span>
        </div>
      ` : ''}
      
      <div style="border-top: 1px dashed #bbb; margin: 12px 0 8px 0;"></div>
      
      <div style="text-align: center; font-size: 12px; color: #666; font-style: italic; line-height: 1.4;">
        <p style="margin: 0; font-weight: 600;">Mokaseh banyak</p>
        <p style="margin: 2px 0 0 0;">Sudah memesan Pempek Cek Boya! Pempek wong kito galo~</p>
      </div>
    </div>
  `;

  document.body.appendChild(tempDiv);
  
  try {
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false
    });
    document.body.removeChild(tempDiv);
    return canvas;
  } catch (err) {
    if (tempDiv.parentNode) {
      document.body.removeChild(tempDiv);
    }
    throw err;
  }
}

async function sendWhatsAppReceipt(saleId) {
  const sale = state.sales.find(s => s.id === saleId);
  if (!sale) throw new Error('Penjualan tidak ditemukan.');
  
  const cust = state.customers.find(c => c.name.toLowerCase() === sale.customer_name.toLowerCase());
  const phone = cust ? cust.phone : '';
  const cleanPhone = formatWhatsAppNumber(phone);
  
  if (!cleanPhone) {
    throw new Error('Nomor WhatsApp pelanggan belum terdaftar.');
  }
  
  const ws = await window.db.getWASettings();
  if (!ws || !ws.url || !ws.instance || !ws.apiKey) {
    throw new Error('Koneksi WhatsApp API belum diatur pada Pengaturan Cloud.');
  }

  const text = generateWhatsAppText(sale);

  // Generate canvas offscreen
  const canvas = await generateReceiptCanvasSilent(sale);
  const base64Data = canvas.toDataURL('image/png').split(',')[1];
  
  const body = {
    number: cleanPhone,
    media: base64Data,
    mediatype: 'image',
    fileName: `Struk_${sale.id}.png`,
    caption: text,
    delay: 1200
  };
  
  const baseUrl = ws.url.endsWith('/') ? ws.url.slice(0, -1) : ws.url;
  const endpoint = `${baseUrl}/message/sendMedia/${ws.instance}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': ws.apiKey
    },
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Evolution API response issue (${response.status}): ${errText}`);
  }
  
  return true;
}

function copyWhatsAppText(saleId) {
  const sale = state.sales.find(s => s.id === saleId);
  if (!sale) {
    showToast('Transaksi tidak ditemukan.', 'danger');
    return;
  }
  
  const text = generateWhatsAppText(sale);
  navigator.clipboard.writeText(text)
    .then(() => showToast('Rincian WA berhasil disalin ke clipboard!', 'success'))
    .catch((err) => showToast('Gagal menyalin teks: ' + err.message, 'danger'));
}

window.sendWhatsAppMessage = sendWhatsAppMessage;
window.sendWhatsAppReceipt = sendWhatsAppReceipt;
window.copyWhatsAppText = copyWhatsAppText;
window.navigate = navigate;

window.checkWAConnection = async () => {
  const urlEl = document.getElementById('wa-url');
  const instanceEl = document.getElementById('wa-instance');
  const keyEl = document.getElementById('wa-key');
  
  if (!urlEl || !instanceEl || !keyEl) return;
  
  const url = urlEl.value.trim();
  const instance = instanceEl.value.trim();
  const apiKey = keyEl.value.trim();
  
  if (!url || !instance || !apiKey) {
    showToast('Mohon isi kolom URL, Instance, dan API Key untuk melakukan tes.', 'warning');
    return;
  }
  
  showToast('Memeriksa koneksi ke Evolution API...', 'info');
  
  try {
    const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    const endpoint = `${baseUrl}/instance/connectionState/${instance}`;
    
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'apikey': apiKey
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      const state = data.instance?.state || data.instance?.status || 'connected';
      showToast(`Koneksi Sukses! Status Instance: ${state}`, 'success');
    } else {
      const errText = await response.text();
      showToast(`Koneksi Gagal (${response.status}): ${errText}`, 'danger');
    }
  } catch (err) {
    console.error('Test Connection Error:', err);
    if (err.message.includes('fetch') || err.message.includes('CORS') || err.message.includes('TypeError')) {
      showToast('Koneksi terhambat CORS browser. Silakan set CORS_ORIGIN=* pada file .env Evolution API Anda.', 'warning');
    } else {
      showToast(`Kesalahan koneksi: ${err.message}`, 'danger');
    }
  }
};

// --- RECEIPT IMAGE GENERATION & SHARING ---
async function generateReceiptCanvas() {
  const paper = document.querySelector('.receipt-paper');
  if (!paper) {
    throw new Error('Elemen struk tidak ditemukan.');
  }
  // Sembunyikan bayangan / styling tertentu agar struk bersih
  const originalBoxShadow = paper.style.boxShadow;
  paper.style.boxShadow = 'none';

  try {
    const canvas = await html2canvas(paper, {
      scale: 2, // Menghasilkan gambar resolusi tinggi
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false
    });
    paper.style.boxShadow = originalBoxShadow;
    return canvas;
  } catch (err) {
    paper.style.boxShadow = originalBoxShadow;
    throw err;
  }
}

async function downloadReceiptImage(saleId) {
  if (window.location.protocol === 'file:') {
    showToast('Fitur Gambar diblokir oleh browser pada protokol file://. Harap jalankan aplikasi menggunakan server lokal (npm run dev)!', 'danger');
    return;
  }
  const sale = state.sales.find(s => s.id === saleId);
  const customerName = sale ? sale.customer_name : 'Customer';
  showToast('Sedang membuat gambar struk...', 'info');

  try {
    const canvas = await generateReceiptCanvas();
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Struk_PempekCekBoya_${customerName}_${saleId.slice(0, 8)}.png`;
    link.href = dataUrl;
    link.click();
    showToast('Gambar struk berhasil diunduh!', 'success');
  } catch (err) {
    showToast('Gagal membuat gambar: ' + err.message, 'danger');
  }
}

async function copyReceiptImageToClipboard(saleId) {
  if (window.location.protocol === 'file:') {
    showToast('Fitur Gambar diblokir oleh browser pada protokol file://. Harap jalankan aplikasi menggunakan server lokal (npm run dev)!', 'danger');
    return;
  }
  showToast('Sedang menyalin gambar struk ke clipboard...', 'info');
  try {
    const canvas = await generateReceiptCanvas();
    canvas.toBlob(async (blob) => {
      if (!blob) {
        showToast('Gagal memproses gambar.', 'danger');
        return;
      }
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]);
        showToast('Gambar struk disalin ke clipboard! Silakan paste (Ctrl+V) di chat WA pelanggan.', 'success');
      } catch (err) {
        showToast('Browser Anda tidak mendukung fitur salin gambar otomatis. Silakan unduh gambar struk terlebih dahulu.', 'warning');
      }
    }, 'image/png');
  } catch (err) {
    showToast('Gagal membuat gambar: ' + err.message, 'danger');
  }
}

async function sendReceiptImageWhatsApp(saleId) {
  if (window.location.protocol === 'file:') {
    showToast('Fitur Gambar diblokir oleh browser pada protokol file://. Harap jalankan aplikasi menggunakan server lokal (npm run dev)!', 'danger');
    return;
  }
  const sale = state.sales.find(s => s.id === saleId);
  if (!sale) {
    showToast('Transaksi tidak ditemukan.', 'danger');
    return;
  }

  // Cari no HP dari database customer
  const cust = state.customers.find(c => c.name.toLowerCase() === sale.customer_name.toLowerCase());
  const phone = cust ? cust.phone : '';
  const cleanPhone = formatWhatsAppNumber(phone);

  if (!cleanPhone) {
    showToast('Nomor WhatsApp pelanggan belum terdaftar. Silakan edit pesanan untuk melengkapi nomor WA.', 'warning');
    return;
  }

  showToast('Sedang memproses gambar dan membuka WhatsApp...', 'info');
  try {
    const canvas = await generateReceiptCanvas();
    canvas.toBlob(async (blob) => {
      if (!blob) {
        showToast('Gagal memproses gambar.', 'danger');
        return;
      }
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]);
        showToast('Gambar struk otomatis disalin! Buka chat WA dan tekan Ctrl+V / Paste untuk mengirim.', 'success');
        
        // Buka WhatsApp
        setTimeout(() => {
          const url = `https://wa.me/${cleanPhone}`;
          window.open(url, '_blank');
        }, 1000);
      } catch (err) {
        showToast('Gagal menyalin gambar ke clipboard. Membuka WhatsApp chat saja...', 'warning');
        setTimeout(() => {
          const url = `https://wa.me/${cleanPhone}`;
          window.open(url, '_blank');
        }, 1000);
      }
    }, 'image/png');
  } catch (err) {
    showToast('Gagal memproses gambar: ' + err.message, 'danger');
  }
}

window.downloadReceiptImage = downloadReceiptImage;
window.copyReceiptImageToClipboard = copyReceiptImageToClipboard;
window.sendReceiptImageWhatsApp = sendReceiptImageWhatsApp;

// --- ORDER RECAP VIEWS RENDERERS ---
function renderOrderRecap(container, actionsContainer) {
  const batchOptions = `<option value="all">Semua Batch</option>` + state.batches.map(b => `
    <option value="${b.id}" ${state.currentReportFilters.batchId === b.id ? 'selected' : ''}>${escapeHTML(b.name)}</option>
  `).join('');
  
  const customerOptions = `<option value="all">Semua Pelanggan</option>` + state.customers.map(c => `
    <option value="${escapeHTML(c.name)}" ${state.currentReportFilters.customerName === c.name ? 'selected' : ''}>${escapeHTML(c.name)} (${c.id})</option>
  `).join('');

  container.innerHTML = `
    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="form-group">
        <label class="form-label" for="filter-batch">Filter Batch</label>
        <select id="filter-batch" class="form-control">
          ${batchOptions}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label" for="filter-customer">Filter Pelanggan</label>
        <select id="filter-customer" class="form-control">
          ${customerOptions}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label" for="filter-payment">Status Bayar</label>
        <select id="filter-payment" class="form-control">
          <option value="all" ${state.currentReportFilters.paymentStatus === 'all' ? 'selected' : ''}>Semua</option>
          <option value="paid" ${state.currentReportFilters.paymentStatus === 'paid' ? 'selected' : ''}>Lunas</option>
          <option value="unpaid" ${state.currentReportFilters.paymentStatus === 'unpaid' ? 'selected' : ''}>Belum Lunas</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label" for="filter-delivery">Status Kirim</label>
        <select id="filter-delivery" class="form-control">
          <option value="all" ${state.currentReportFilters.deliveryStatus === 'all' ? 'selected' : ''}>Semua</option>
          <option value="pending" ${state.currentReportFilters.deliveryStatus === 'pending' ? 'selected' : ''}>Menunggu</option>
          <option value="shipped" ${state.currentReportFilters.deliveryStatus === 'shipped' ? 'selected' : ''}>Dikirim</option>
          <option value="delivered" ${state.currentReportFilters.deliveryStatus === 'delivered' ? 'selected' : ''}>Diterima</option>
        </select>
      </div>
      <div class="filter-actions">
        <button class="btn btn-primary" id="btn-apply-filters">
          <i data-lucide="search"></i> Cari
        </button>
        <button class="btn btn-secondary" id="btn-preview-report">
          <i data-lucide="eye"></i> Pratinjau Web
        </button>
        <button class="btn btn-accent" id="btn-print-report">
          <i data-lucide="printer"></i> Cetak PDF
        </button>
      </div>
    </div>

    <!-- Table Recap -->
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Hasil Rekap Transaksi Penjualan</h3>
          <p class="panel-subtitle">Daftar transaksi yang cocok dengan kriteria pencarian</p>
        </div>
      </div>
      <div class="table-wrapper" id="recap-table-container">
        ${renderFilteredRecapTable()}
      </div>
    </div>
  `;

  lucide.createIcons();

  // Filter actions setup
  document.getElementById('btn-apply-filters').addEventListener('click', () => {
    state.currentReportFilters.batchId = document.getElementById('filter-batch').value;
    state.currentReportFilters.customerName = document.getElementById('filter-customer').value;
    state.currentReportFilters.paymentStatus = document.getElementById('filter-payment').value;
    state.currentReportFilters.deliveryStatus = document.getElementById('filter-delivery').value;
    
    document.getElementById('recap-table-container').innerHTML = renderFilteredRecapTable();
    lucide.createIcons();
  });

  document.getElementById('btn-preview-report').addEventListener('click', () => {
    state.currentReportFilters.batchId = document.getElementById('filter-batch').value;
    state.currentReportFilters.customerName = document.getElementById('filter-customer').value;
    state.currentReportFilters.paymentStatus = document.getElementById('filter-payment').value;
    state.currentReportFilters.deliveryStatus = document.getElementById('filter-delivery').value;
    
    window.location.hash = 'report-preview';
  });

  document.getElementById('btn-print-report').addEventListener('click', () => {
    state.currentReportFilters.batchId = document.getElementById('filter-batch').value;
    state.currentReportFilters.customerName = document.getElementById('filter-customer').value;
    state.currentReportFilters.paymentStatus = document.getElementById('filter-payment').value;
    state.currentReportFilters.deliveryStatus = document.getElementById('filter-delivery').value;
    
    window.location.hash = 'report-preview';
    setTimeout(() => {
      window.print();
    }, 500);
  });
}

function renderFilteredRecapTable(isPlainTable = false) {
  let filtered = [...state.sales];

  const filters = state.currentReportFilters;
  if (filters.batchId !== 'all') {
    filtered = filtered.filter(s => s.batch_id === filters.batchId);
  }
  if (filters.customerName !== 'all') {
    filtered = filtered.filter(s => s.customer_name === filters.customerName);
  }
  if (filters.paymentStatus !== 'all') {
    filtered = filtered.filter(s => s.payment_status === filters.paymentStatus);
  }
  if (filters.deliveryStatus !== 'all') {
    filtered = filtered.filter(s => s.delivery_status === filters.deliveryStatus);
  }

  if (filtered.length === 0) {
    return `<div class="empty-state" style="padding: 40px;"><p>Tidak ada transaksi yang cocok.</p></div>`;
  }

  return `
    <table class="${isPlainTable ? 'report-table' : 'table-custom'}">
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Batch</th>
          <th>Pelanggan</th>
          <th>Daftar Belanja Paket</th>
          <th>Total Harga</th>
          <th>Status</th>
          ${!isPlainTable ? '<th style="text-align:right;">Aksi</th>' : ''}
        </tr>
      </thead>
      <tbody>
        ${filtered.map(s => {
          const batch = state.batches.find(b => b.id === s.batch_id);
          const batchName = batch ? batch.name : '-';
          
          const custObj = state.customers.find(c => c.name.toLowerCase() === s.customer_name.toLowerCase());
          const custId = custObj ? custObj.id : '-';
          const custWa = custObj ? custObj.phone : '';

          let items = [];
          if (s.items) {
            items = typeof s.items === 'string' ? JSON.parse(s.items) : s.items;
          }
          if (!Array.isArray(items) || items.length === 0) {
            items = [{ package_id: s.package_id, quantity: s.quantity }];
          }

          const itemsText = items.map(item => {
            const pkg = state.packages[item.package_id];
            const name = pkg ? pkg.name.split(' (')[0] : `Paket ${item.package_id}`;
            return `${name} (x${item.quantity})`;
          }).join(', ');

          return `
            <tr>
              <td>${formatDate(s.created_at)}</td>
              <td style="font-weight: 600;">${escapeHTML(batchName)}</td>
              <td>
                <div style="font-weight: 700;">${escapeHTML(s.customer_name)}</div>
                <div style="font-size: 11px; color: var(--text-muted);">ID: ${custId} ${custWa ? `| WA: ${custWa}` : ''}</div>
              </td>
              <td style="font-size: 13px; color: var(--text-secondary);">${itemsText}</td>
              <td style="font-weight: 700; color: var(--accent);">${formatIDR(s.total_price)}</td>
              <td>
                <span class="badge ${s.payment_status === 'paid' ? 'badge-success' : 'badge-danger'}">
                  ${s.payment_status === 'paid' ? 'Lunas' : 'Belum'}
                </span>
                <span class="badge ${s.delivery_status === 'delivered' ? 'badge-success' : s.delivery_status === 'shipped' ? 'badge-info' : 'badge-warning'}">
                  ${s.delivery_status === 'delivered' ? 'Diterima' : s.delivery_status === 'shipped' ? 'Dikirim' : 'Menunggu'}
                </span>
              </td>
              ${!isPlainTable ? `
                <td style="text-align:right;">
                  <div style="display:inline-flex; gap:6px;">
                    <button class="btn btn-secondary btn-icon-only" style="padding: 6px;" title="Lihat Struk" onclick="window.viewReceipt('${s.id}')">
                      <i data-lucide="receipt" style="width: 14px; height:14px;"></i>
                    </button>
                    <button class="btn btn-secondary btn-icon-only" style="padding: 6px;" title="Salin Rincian WA" onclick="window.copyWhatsAppText('${s.id}')">
                      <i data-lucide="copy" style="width: 14px; height:14px;"></i>
                    </button>
                    <button class="btn btn-accent btn-icon-only" style="padding: 6px;" title="Kirim WA Langsung" onclick="window.sendWhatsAppMessage('${s.id}')">
                      <i data-lucide="send" style="width: 14px; height:14px;"></i>
                    </button>
                  </div>
                </td>
              ` : ''}
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

function renderReportPreview(container, actionsContainer) {
  const filters = state.currentReportFilters;
  
  const batchObj = state.batches.find(b => b.id === filters.batchId);
  const batchLabel = batchObj ? batchObj.name : filters.batchId === 'all' ? 'Semua Batch' : '-';
  const customerLabel = filters.customerName === 'all' ? 'Semua Pelanggan' : filters.customerName || 'Semua Pelanggan';
  const payLabel = filters.paymentStatus === 'all' ? 'Semua' : filters.paymentStatus === 'paid' ? 'Lunas' : 'Belum Lunas';
  const delLabel = filters.deliveryStatus === 'all' ? 'Semua' : filters.deliveryStatus === 'pending' ? 'Menunggu' : filters.deliveryStatus === 'shipped' ? 'Dikirim' : 'Diterima';

  container.innerHTML = `
    <!-- Actions Toolbar (Screen Only) -->
    <div class="report-preview-actions">
      <button class="btn btn-secondary" onclick="window.closeReportPreview()">
        <i data-lucide="arrow-left"></i> Kembali
      </button>
      <button class="btn btn-primary" onclick="window.print()">
        <i data-lucide="printer"></i> Cetak Laporan (PDF)
      </button>
    </div>

    <!-- Web View / Printed Document Content -->
    <div class="report-preview-wrapper">
      <div class="report-preview-header">
        <h2>LAPORAN PENJUALAN PEMPEK CEK BOYA</h2>
        <p>Ringkasan rekap pesanan dan transaksi operasional</p>
      </div>

      <!-- Filter Summary Information -->
      <div class="report-filter-summary">
        <span><strong>Batch:</strong> ${escapeHTML(batchLabel)}</span>
        <span><strong>Pelanggan:</strong> ${escapeHTML(customerLabel)}</span>
        <span><strong>Status Bayar:</strong> ${escapeHTML(payLabel)}</span>
        <span><strong>Status Kirim:</strong> ${escapeHTML(delLabel)}</span>
        <span><strong>Dicetak Pada:</strong> ${new Date().toLocaleDateString('id-ID')}</span>
      </div>

      <!-- Table Content -->
      ${renderFilteredRecapTable(true)}
    </div>
  `;

  lucide.createIcons();
}

window.closeReportPreview = () => {
  window.history.pushState("", document.title, window.location.pathname + window.location.search);
  navigate('order-recap');
};

// --- CUSTOMER MODAL ACTIONS & CRUD ---

function openCustomerModal(id = null) {
  const submitBtn = document.getElementById('btn-save-customer');
  const titleEl = document.getElementById('modal-customer-title');
  const idInput = document.getElementById('customer-id');
  const modeInput = document.getElementById('customer-mode');
  const nameInput = document.getElementById('customer-name');
  const phoneInput = document.getElementById('customer-phone');

  if (id) {
    const cust = state.customers.find(c => c.id === id);
    if (cust) {
      titleEl.textContent = `Edit Pelanggan: ${cust.id}`;
      idInput.value = cust.id;
      modeInput.value = 'edit';
      nameInput.value = cust.name;
      phoneInput.value = cust.phone || '';
      submitBtn.textContent = 'Simpan Perubahan';
    }
  } else {
    titleEl.textContent = 'Tambah Pelanggan Baru';
    idInput.value = '';
    modeInput.value = 'add';
    nameInput.value = '';
    phoneInput.value = '';
    submitBtn.textContent = 'Simpan Pelanggan';
  }
  openModal('modal-customer');
}

async function handleCustomerSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('customer-id').value;
  const mode = document.getElementById('customer-mode').value;
  const name = document.getElementById('customer-name').value.trim();
  const phone = document.getElementById('customer-phone').value.trim();

  try {
    if (mode === 'edit') {
      await window.db.updateCustomer(id, { name, phone });
      showToast(`Data pelanggan "${name}" berhasil diperbarui.`, 'success');
    } else {
      // Cek apakah nama sudah terdaftar
      const match = state.customers.find(c => c.name.toLowerCase() === name.toLowerCase());
      if (match) {
        throw new Error(`Nama pelanggan "${name}" sudah terdaftar dengan ID ${match.id}.`);
      }
      await window.db.addCustomer({ name, phone });
      showToast(`Pelanggan baru "${name}" berhasil ditambahkan.`, 'success');
    }
    closeModal();
    await refreshData();
    // Render ulang tampilan rekap pelanggan jika sedang aktif di halaman itu
    if (state.currentView === 'customers') {
      navigate('customers');
    }
  } catch (err) {
    showToast(err.message, 'danger');
  }
}

window.editCustomer = (id) => {
  openCustomerModal(id);
};

window.deleteCustomerConfirm = async (id, name) => {
  if (confirm(`Apakah Anda yakin ingin menghapus pelanggan "${name}"? Data transaksinya di rekap rekap penjualan akan tetap ada dengan nama tersebut.`)) {
    try {
      await window.db.deleteCustomer(id);
      showToast(`Pelanggan "${name}" berhasil dihapus dari sistem.`, 'success');
      await refreshData();
      if (state.currentView === 'customers') {
        navigate('customers');
      }
    } catch (err) {
      showToast(err.message, 'danger');
    }
  }
};

// --- PRODUCTION MANAGEMENT VIEW ---
async function renderProduction(container, actionsContainer) {
  if (actionsContainer) actionsContainer.innerHTML = '';
  
  const btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.innerHTML = '<i data-lucide="plus"></i> Catat Produksi Baru';
  btn.addEventListener('click', () => openProductionModal());
  actionsContainer.appendChild(btn);
  
  const productionRecords = await window.db.getProductionRecords();
  
  if (productionRecords.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i data-lucide="factory"></i>
        <h3>Belum Ada Data Produksi</h3>
        <p>Mulai catat produksi butiran pempek harian Anda di sini.</p>
        <button class="btn btn-primary" onclick="window.openProductionModal()">Catat Produksi Pertama</button>
      </div>
    `;
    return;
  }
  
  let html = `
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Riwayat Produksi</h3>
          <p class="panel-subtitle">Daftar catatan produksi butiran pempek</p>
        </div>
      </div>
      <div class="table-wrapper">
        <table class="table-custom">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Kulit</th>
              <th>Telur</th>
              <th>Lenjer Kecil</th>
              <th>Lenjer Potong</th>
              <th>Lenjer Besar</th>
              <th>Kapal Selam</th>
              <th>Catatan</th>
              <th style="text-align:right;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${productionRecords.map(record => {
              let items = typeof record.items === 'string' ? JSON.parse(record.items) : record.items;
              return `
                <tr>
                  <td>${formatDate(record.date)}</td>
                  <td>${items.kulit || 0}</td>
                  <td>${items.telur || 0}</td>
                  <td>${items.lenjer_kecil || 0}</td>
                  <td>${items.lenjer_potong || 0}</td>
                  <td>${items.lenjer_besar || 0}</td>
                  <td>${items.kapal_selam || 0}</td>
                  <td style="font-size: 12px; color: var(--text-secondary);">${escapeHTML(record.notes || '-')}</td>
                  <td style="text-align:right;">
                    <button class="btn btn-danger btn-icon-only" style="padding: 6px;" title="Hapus Produksi" onclick="window.deleteProductionConfirm('${record.id}')">
                      <i data-lucide="trash-2" style="width: 14px; height:14px;"></i>
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  container.innerHTML = html;
  
  window.deleteProductionConfirm = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus catatan produksi ini?')) {
      try {
        await window.db.deleteProductionRecord(id);
        showToast('Catatan produksi berhasil dihapus.', 'success');
        navigate('production');
      } catch (err) {
        showToast(err.message, 'danger');
      }
    }
  };
}

function openProductionModal() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('production-date').value = today;
  document.getElementById('prod-kulit').value = 0;
  document.getElementById('prod-telur').value = 0;
  document.getElementById('prod-lenjer-kecil').value = 0;
  document.getElementById('prod-lenjer-potong').value = 0;
  document.getElementById('prod-lenjer-besar').value = 0;
  document.getElementById('prod-kapal-selam').value = 0;
  document.getElementById('production-notes').value = '';
  openModal('modal-production');
}

async function handleProductionSubmit(e) {
  e.preventDefault();
  
  const date = document.getElementById('production-date').value;
  const items = {
    kulit: parseInt(document.getElementById('prod-kulit').value) || 0,
    telur: parseInt(document.getElementById('prod-telur').value) || 0,
    lenjer_kecil: parseInt(document.getElementById('prod-lenjer-kecil').value) || 0,
    lenjer_potong: parseInt(document.getElementById('prod-lenjer-potong').value) || 0,
    lenjer_besar: parseInt(document.getElementById('prod-lenjer-besar').value) || 0,
    kapal_selam: parseInt(document.getElementById('prod-kapal-selam').value) || 0
  };
  const notes = document.getElementById('production-notes').value.trim();
  
  // Check if at least one item has quantity
  const totalProduced = Object.values(items).reduce((sum, val) => sum + val, 0);
  if (totalProduced === 0) {
    showToast('Mohon masukkan jumlah produksi minimal satu jenis butiran.', 'warning');
    return;
  }
  
  try {
    await window.db.addProductionRecord({ date, items, notes });
    showToast('Catatan produksi berhasil disimpan!', 'success');
    closeModal();
    navigate('production');
  } catch (err) {
    showToast(err.message, 'danger');
  }
}

window.openProductionModal = openProductionModal;

// --- STOCK MANAGEMENT VIEW ---
async function renderStock(container, actionsContainer) {
  if (actionsContainer) actionsContainer.innerHTML = '';
  
  const btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.style.marginRight = '8px';
  btn.innerHTML = '<i data-lucide="package"></i> Packing Stok ke Paket';
  btn.addEventListener('click', () => openStockAllocationModal());
  actionsContainer.appendChild(btn);
  
  const btnAdjustLoose = document.createElement('button');
  btnAdjustLoose.className = 'btn btn-secondary';
  btnAdjustLoose.style.marginRight = '8px';
  btnAdjustLoose.innerHTML = '<i data-lucide="sliders"></i> Sesuaikan Butiran';
  btnAdjustLoose.addEventListener('click', () => openAdjustLooseModal());
  actionsContainer.appendChild(btnAdjustLoose);

  const btnAdjustPackage = document.createElement('button');
  btnAdjustPackage.className = 'btn btn-secondary';
  btnAdjustPackage.innerHTML = '<i data-lucide="sliders"></i> Sesuaikan Paket';
  btnAdjustPackage.addEventListener('click', () => openAdjustPackageModal());
  actionsContainer.appendChild(btnAdjustPackage);
  
  const stockSummary = await window.db.getStockSummary();
  const packageStock = stockSummary.packages;
  const packagesData = stockSummary.packages_data;
  const ingredientStock = stockSummary.ingredients;
  
  let html = `
    <!-- Ingredient (Butiran) Stock Panel -->
    <div class="panel" style="margin-bottom: 24px;">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Stok Pempek Butiran (Bahan Sisa Produksi)</h3>
          <p class="panel-subtitle">Total butir pempek sisa yang belum dimasukkan ke dalam paket</p>
        </div>
      </div>
      <div class="production-grid">
        ${Object.keys(ingredientStock).map(itemKey => `
          <div class="prod-item">
            <div class="prod-count">${ingredientStock[itemKey]}</div>
            <div class="prod-label">${window.ITEM_LABELS[itemKey] || itemKey}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Package Stock Panel -->
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Stok Paket Siap Jual</h3>
          <p class="panel-subtitle">Daftar ketersediaan stok paket (berkurang otomatis saat penjualan)</p>
        </div>
      </div>
  `;

  if (Object.keys(packageStock).length === 0) {
    html += `
      <div class="empty-state" style="padding: 40px 20px;">
        <i data-lucide="package-search"></i>
        <h3>Belum Ada Stok Paket</h3>
        <p>Belum ada paket yang siap jual. Mulai packing stok butiran ke paket sekarang.</p>
        <button class="btn btn-primary" onclick="window.openStockAllocationModal()">Packing Stok Pertama</button>
      </div>
    </div>
    `;
  } else {
    html += `
      <div class="card-grid">
        ${Object.keys(packageStock).map(packageId => {
          const pkg = packagesData[packageId];
          const qty = packageStock[packageId];
          const nameOnly = pkg ? pkg.name.split(' (')[0] : `Paket ${packageId}`;
          const price = pkg ? pkg.price : 0;
          
          return `
            <div class="card ${qty > 0 ? 'card-primary' : 'card-secondary'}">
              <div class="card-header-icon">
                <i data-lucide="package"></i>
              </div>
              <div class="card-subtitle">${escapeHTML(nameOnly)}</div>
              <div class="card-title">${qty} Paket</div>
              <div class="card-meta">
                <i data-lucide="tag"></i> ${formatIDR(price)} per paket
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
    `;
  }
  
  container.innerHTML = html;
}
async function openStockAllocationModal() {
  const stockSummary = await window.db.getStockSummary();
  const ingredientStock = stockSummary.ingredients;
  const packages = stockSummary.packages_data;
  
  // Display available ingredients
  const ingredientsDisplay = document.getElementById('available-ingredients-display');
  ingredientsDisplay.innerHTML = Object.keys(ingredientStock).map(key => {
    const label = window.ITEM_LABELS[key] || key;
    const qty = ingredientStock[key];
    return `<div><strong>${label}:</strong> ${qty} pcs</div>`;
  }).join('');
  
  // Populate package select
  const packageSelect = document.getElementById('stock-package-select');
  packageSelect.innerHTML = '<option value="" disabled selected>Pilih Jenis Paket</option>';
  Object.keys(packages).forEach(pkgId => {
    const pkg = packages[pkgId];
    const option = document.createElement('option');
    option.value = pkgId;
    option.textContent = pkg.name;
    packageSelect.appendChild(option);
  });
  
  // Reset form
  document.getElementById('stock-quantity').value = 1;
  document.getElementById('max-possible-packages').textContent = '0';
  document.getElementById('package-composition-display').innerHTML = '<p style="color: var(--text-secondary);">Pilih paket untuk melihat komposisi</p>';
  
  // Add event listener for package selection
  packageSelect.onchange = () => {
    const selectedPkgId = packageSelect.value;
    if (selectedPkgId && packages[selectedPkgId]) {
      const pkg = packages[selectedPkgId];
      const composition = pkg.composition;
      
      // Display composition
      const compDisplay = document.getElementById('package-composition-display');
      compDisplay.innerHTML = Object.keys(composition).map(key => {
        if (composition[key] > 0) {
          const label = window.ITEM_LABELS[key] || key;
          return `<div><strong>${label}:</strong> ${composition[key]} pcs</div>`;
        }
        return '';
      }).join('');
      
      // Calculate max possible packages
      const maxPossible = window.calculatePossiblePackages(ingredientStock, composition);
      document.getElementById('max-possible-packages').textContent = maxPossible;
      document.getElementById('stock-quantity').max = maxPossible;
    }
  };
  
  openModal('modal-stock-allocation');
}

async function handleStockAllocationSubmit(e) {
  e.preventDefault();
  
  const packageId = document.getElementById('stock-package-select').value;
  const quantity = parseInt(document.getElementById('stock-quantity').value) || 0;
  
  if (!packageId) {
    showToast('Silakan pilih jenis paket terlebih dahulu.', 'warning');
    return;
  }
  
  if (quantity <= 0) {
    showToast('Jumlah paket harus lebih dari 0.', 'warning');
    return;
  }
  
  try {
    const stockSummary = await window.db.getStockSummary();
    const packages = stockSummary.packages_data;
    const pkg = packages[packageId];
    const composition = pkg.composition;
    
    // Check if we have enough ingredients
    const ingredientStock = stockSummary.ingredients;
    const maxPossible = window.calculatePossiblePackages(ingredientStock, composition);
    
    if (quantity > maxPossible) {
      showToast(`Stok tidak cukup! Maksimum ${maxPossible} paket dapat dibuat dengan stok tersedia.`, 'danger');
      return;
    }
    
    // Deduct ingredients and add package stock
    // First, create a negative production record to deduct ingredients
    const deductionItems = {};
    Object.keys(composition).forEach(ingredient => {
      deductionItems[ingredient] = -(composition[ingredient] * quantity);
    });
    
    await window.db.addProductionRecord({
      date: new Date().toISOString().split('T')[0],
      items: deductionItems,
      notes: `Packing ${quantity} paket ${packageId}`
    });
    
    // Then add package stock
    await window.db.updatePackageStock(packageId, quantity);
    
    showToast(`Berhasil packing ${quantity} paket ${pkg.name}!`, 'success');
    closeModal();
    navigate('stock');
  } catch (err) {
    showToast(err.message, 'danger');
  }
}

window.openStockAllocationModal = openStockAllocationModal;

/* --- ANTIGRAVITY INSERTION START --- */

// --- MODAL UTILITIES ---
function openModal(modalId) {
  // Hide all modals first
  document.querySelectorAll('.modal-container').forEach(el => {
    el.style.display = 'none';
  });
  // Show target modal
  const target = document.getElementById(modalId);
  if (target) {
    target.style.display = 'block';
  }
  // Show overlay
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.classList.add('active');
  }
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
  document.querySelectorAll('.modal-container').forEach(el => {
    el.style.display = 'none';
  });
}

window.openModal = openModal;
window.closeModal = closeModal;

// --- SALES MODAL & ACTIONS ---
function populateSaleCustomerSelect() {
  const select = document.getElementById('sale-customer-select');
  if (!select) return;
  select.innerHTML = `
    <option value="" disabled selected>Pilih Pelanggan</option>
    <option value="new">+ Pelanggan Baru / Tulis Manual...</option>
  `;
  state.customers.forEach(c => {
    const option = document.createElement('option');
    option.value = c.id;
    option.textContent = `${c.name} (${c.tier || 'BRONZE'} - ${c.points || 0} Poin)`;
    select.appendChild(option);
  });
}

function populateSalePackageSelect() {
  const select = document.getElementById('sale-package');
  if (!select) return;
  select.innerHTML = '<option value="" disabled selected>Pilih Paket</option>';
  Object.keys(state.packages).forEach(pkgId => {
    const pkg = state.packages[pkgId];
    const option = document.createElement('option');
    option.value = pkgId;
    option.textContent = `${pkg.name} (${formatIDR(pkg.price)})`;
    select.appendChild(option);
  });
}

function openSaleModal(sale = null) {
  const titleEl = document.getElementById('modal-sale-title');
  const idInput = document.getElementById('sale-id');
  const submitBtn = document.getElementById('btn-save-sale');
  
  const groupName = document.getElementById('group-sale-customer-name');
  const groupPhone = document.getElementById('group-sale-customer-phone');
  const nameInput = document.getElementById('sale-customer-name');
  const phoneInput = document.getElementById('sale-customer-phone');
  const statusContainer = document.getElementById('sale-customer-status-container');
  const statusBadge = document.getElementById('sale-customer-status-badge');

  populateSaleCustomerSelect();
  populateSalePackageSelect();

  if (sale) {
    titleEl.textContent = 'Edit Pesanan';
    idInput.value = sale.id;
    submitBtn.textContent = 'Simpan Perubahan';
    
    let saleItems = sale.items;
    if (typeof saleItems === 'string') {
      try { saleItems = JSON.parse(saleItems); } catch { saleItems = []; }
    }
    state.currentSaleItems = JSON.parse(JSON.stringify(saleItems || []));

    const customer = state.customers.find(c => c.name.toLowerCase() === sale.customer_name.toLowerCase());
    if (customer) {
      document.getElementById('sale-customer-select').value = customer.id;
      groupName.style.display = 'none';
      groupPhone.style.display = 'none';
      nameInput.removeAttribute('required');
      statusContainer.style.display = 'block';
      statusBadge.textContent = `Member Tier: ${customer.tier || 'BRONZE'} | Poin: ${customer.points || 0}`;
      statusBadge.className = `badge badge-${(customer.tier || 'BRONZE').toLowerCase()}`;
    } else {
      document.getElementById('sale-customer-select').value = 'new';
      groupName.style.display = 'block';
      groupPhone.style.display = 'block';
      nameInput.value = sale.customer_name;
      nameInput.setAttribute('required', 'true');
      phoneInput.value = '';
      statusContainer.style.display = 'block';
      statusBadge.textContent = 'Pelanggan Baru';
      statusBadge.className = 'badge badge-primary';
    }

    document.getElementById('sale-payment-status').value = sale.payment_status || 'unpaid';
    document.getElementById('sale-delivery-status').value = sale.delivery_status || 'pending';
    document.getElementById('sale-notes').value = sale.notes || '';
  } else {
    titleEl.textContent = 'Tambah Pesanan Baru';
    idInput.value = '';
    submitBtn.textContent = 'Simpan Pesanan';
    state.currentSaleItems = [];

    document.getElementById('sale-customer-select').value = '';
    groupName.style.display = 'none';
    groupPhone.style.display = 'none';
    nameInput.value = '';
    nameInput.removeAttribute('required');
    phoneInput.value = '';
    statusContainer.style.display = 'none';

    document.getElementById('sale-payment-status').value = 'unpaid';
    document.getElementById('sale-delivery-status').value = 'pending';
    document.getElementById('sale-notes').value = '';
  }

  renderSaleModalItems();
  recalculateSaleTotal();
  openModal('modal-sale');
}

async function handleSaleSubmit(e) {
  e.preventDefault();
  
  if (state.currentSaleItems.length === 0) {
    showToast('Mohon tambahkan minimal satu paket pesanan.', 'warning');
    return;
  }

  const id = document.getElementById('sale-id').value;
  const customerId = document.getElementById('sale-customer-select').value;
  const totalPrice = parseFloat(document.getElementById('sale-total-price').value) || 0;
  const paymentStatus = document.getElementById('sale-payment-status').value;
  const deliveryStatus = document.getElementById('sale-delivery-status').value;
  const notes = document.getElementById('sale-notes').value.trim();

  try {
    let customerName = '';
    let finalCustomerId = '';

    if (customerId === 'new') {
      const name = document.getElementById('sale-customer-name').value.trim();
      const phone = document.getElementById('sale-customer-phone').value.trim();
      
      if (!name) {
        showToast('Nama pelanggan baru harus diisi.', 'warning');
        return;
      }

      let cust = state.customers.find(c => c.name.toLowerCase() === name.toLowerCase());
      if (!cust) {
        cust = await window.db.addCustomer({ name, phone });
      } else if (phone && cust.phone !== phone) {
        await window.db.updateCustomer(cust.id, { phone });
      }
      customerName = cust.name;
      finalCustomerId = cust.id;
    } else {
      const cust = state.customers.find(c => c.id === customerId);
      if (!cust) {
        showToast('Pelanggan tidak valid.', 'warning');
        return;
      }
      customerName = cust.name;
      finalCustomerId = cust.id;
    }

    // Hitung poin member
    const pointsEarned = Math.floor(totalPrice / 10000);
    const custObj = state.customers.find(c => c.id === finalCustomerId);
    if (custObj) {
      const newPoints = (custObj.points || 0) + pointsEarned;
      const newTier = window.calculateMemberTier(newPoints);
      await window.db.updateCustomer(finalCustomerId, { points: newPoints, tier: newTier });
    }

    const saleData = {
      batch_id: null,
      customer_name: customerName,
      package_id: state.currentSaleItems[0].package_id,
      quantity: state.currentSaleItems[0].quantity,
      total_price: totalPrice,
      payment_status: paymentStatus,
      delivery_status: deliveryStatus,
      notes: notes,
      items: state.currentSaleItems
    };

    if (id) {
      // Edit mode: Revert old stock if original exists
      const originalSale = state.sales.find(s => s.id === id);
      if (originalSale) {
        let origItems = originalSale.items;
        if (typeof origItems === 'string') {
          try { origItems = JSON.parse(origItems); } catch { origItems = []; }
        }
        for (const item of (origItems || [])) {
          await window.db.updatePackageStock(item.package_id, item.quantity);
        }
      }

      // Deduct new items from stock
      for (const item of state.currentSaleItems) {
        await window.db.updatePackageStock(item.package_id, -item.quantity);
      }

      await window.db.updateSale(id, saleData);
      showToast('Pesanan berhasil diperbarui!', 'success');
    } else {
      // New mode: Deduct items from stock
      for (const item of state.currentSaleItems) {
        await window.db.updatePackageStock(item.package_id, -item.quantity);
      }

      const newSale = await window.db.addSale(saleData);
      showToast('Pesanan berhasil disimpan!', 'success');

      // Auto-send WhatsApp if configured
      const waSettings = await window.db.getWASettings();
      if (waSettings && waSettings.autoSend) {
        try {
          await sendWhatsAppReceipt(newSale.id);
          showToast('Struk otomatis berhasil dikirim via WhatsApp!', 'success');
        } catch (waErr) {
          console.warn('Gagal kirim WhatsApp otomatis:', waErr);
          if (waErr.message.includes('belum terdaftar')) {
            showToast('Gagal kirim WA otomatis: Nomor pelanggan belum terdaftar.', 'warning');
          } else {
            showToast(`Gagal kirim WA otomatis: ${waErr.message}. Klik di sini untuk kirim manual.`, 'warning');
            setTimeout(() => {
              const toasts = document.querySelectorAll('.toast-warning');
              const lastToast = toasts[toasts.length - 1];
              if (lastToast) {
                lastToast.style.cursor = 'pointer';
                lastToast.title = 'Klik untuk mengirim manual';
                lastToast.onclick = () => {
                  sendWhatsAppMessage(newSale.id);
                  lastToast.remove();
                };
              }
            }, 100);
          }
        }
      }
    }

    closeModal();
    await refreshData();
    navigate('sales');
  } catch (err) {
    showToast(err.message, 'danger');
  }
}

// --- EXPENSES MODAL & ACTIONS ---
function openExpenseModal(expense = null) {
  const catSelect = document.getElementById('expense-category');
  const customGroup = document.getElementById('group-custom-category');
  const customInput = document.getElementById('expense-custom-category');
  const dateInput = document.getElementById('expense-date');
  const amountInput = document.getElementById('expense-amount');
  const descInput = document.getElementById('expense-description');
  const titleEl = document.getElementById('modal-expense-title');

  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;

  if (expense) {
    titleEl.textContent = 'Edit Pengeluaran';
    const standardCategories = ['raw_material', 'packaging', 'operational', 'marketing', 'other'];
    if (standardCategories.includes(expense.category)) {
      catSelect.value = expense.category;
      customGroup.style.display = 'none';
      customInput.value = '';
      customInput.removeAttribute('required');
    } else {
      catSelect.value = '__custom__';
      customGroup.style.display = 'block';
      customInput.value = expense.category;
      customInput.setAttribute('required', 'true');
    }
    dateInput.value = expense.date;
    amountInput.value = expense.amount;
    descInput.value = expense.description;
  } else {
    titleEl.textContent = 'Catat Pengeluaran Baru';
    catSelect.value = '';
    customGroup.style.display = 'none';
    customInput.value = '';
    customInput.removeAttribute('required');
    amountInput.value = '';
    descInput.value = '';
  }

  openModal('modal-expense');
}

async function handleExpenseSubmit(e) {
  e.preventDefault();

  let category = document.getElementById('expense-category').value;
  if (category === '__custom__') {
    category = document.getElementById('expense-custom-category').value.trim();
  }
  const date = document.getElementById('expense-date').value;
  const amount = parseFloat(document.getElementById('expense-amount').value) || 0;
  const description = document.getElementById('expense-description').value.trim();

  if (!category) {
    showToast('Silakan tentukan kategori pengeluaran.', 'warning');
    return;
  }

  try {
    await window.db.addExpense({
      batch_id: null,
      category,
      date,
      amount,
      description
    });
    showToast('Pengeluaran berhasil dicatat!', 'success');
    closeModal();
    await refreshData();
    navigate('sales');
  } catch (err) {
    showToast(err.message, 'danger');
  }
}

// --- PACKAGES MODAL & ACTIONS ---
function openPackageModal(id = null, pkg = null) {
  const modeInput = document.getElementById('package-mode');
  const idInput = document.getElementById('package-id-input');
  const nameInput = document.getElementById('package-name');
  const priceInput = document.getElementById('package-price');
  const titleEl = document.getElementById('modal-package-title');
  const custContainer = document.getElementById('custom-compositions-container');
  const packageTypeSelect = document.getElementById('package-type');
  const compFields = document.getElementById('composition-fields-section');

  custContainer.innerHTML = '';

  if (pkg) {
    titleEl.textContent = 'Edit Menu';
    modeInput.value = 'edit';
    idInput.value = id;
    idInput.readOnly = true;
    nameInput.value = pkg.name;
    priceInput.value = pkg.price;

    let comp = pkg.composition;
    if (typeof comp === 'string') {
      try { comp = JSON.parse(comp); } catch { comp = {}; }
    }

    document.getElementById('comp-kulit').value = comp.kulit || 0;
    document.getElementById('comp-telur').value = comp.telur || 0;
    document.getElementById('comp-lenjer-kecil').value = comp.lenjer_kecil || 0;
    document.getElementById('comp-lenjer-potong').value = comp.lenjer_potong || 0;
    document.getElementById('comp-lenjer-besar').value = comp.lenjer_besar || 0;
    document.getElementById('comp-kapal-selam').value = comp.kapal_selam || 0;

    const standardKeys = ['kulit', 'telur', 'lenjer_kecil', 'lenjer_potong', 'lenjer_besar', 'kapal_selam'];
    Object.keys(comp).forEach(key => {
      if (!standardKeys.includes(key)) {
        addCustomCompositionRow(key, comp[key]);
      }
    });

    let hasComposition = false;
    if (comp && Object.keys(comp).length > 0) {
      hasComposition = Object.values(comp).some(v => v > 0);
    }

    if (packageTypeSelect) {
      packageTypeSelect.value = hasComposition ? 'package' : 'single';
    }
    if (compFields) {
      compFields.style.display = hasComposition ? 'block' : 'none';
    }
  } else {
    titleEl.textContent = 'Tambah Menu Baru';
    modeInput.value = 'add';
    idInput.value = '';
    idInput.readOnly = false;
    nameInput.value = '';
    priceInput.value = '';

    document.getElementById('comp-kulit').value = 0;
    document.getElementById('comp-telur').value = 0;
    document.getElementById('comp-lenjer-kecil').value = 0;
    document.getElementById('comp-lenjer-potong').value = 0;
    document.getElementById('comp-lenjer-besar').value = 0;
    document.getElementById('comp-kapal-selam').value = 0;

    if (packageTypeSelect) {
      packageTypeSelect.value = 'package';
    }
    if (compFields) {
      compFields.style.display = 'block';
    }
  }

  openModal('modal-package');
}

window.addNewCustomCompositionRow = () => {
  const inputLabel = document.getElementById('new-comp-label');
  const label = inputLabel.value.trim();
  if (!label) {
    showToast('Silakan masukkan nama kategori butiran kustom.', 'warning');
    return;
  }
  
  const key = label.toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/_+/g, '_');
  if (['kulit', 'telur', 'lenjer_kecil', 'lenjer_potong', 'lenjer_besar', 'kapal_selam'].includes(key)) {
    showToast('Nama kategori sudah terdaftar sebagai kategori butiran standar.', 'warning');
    return;
  }
  
  if (document.getElementById(`comp-${key}`)) {
    showToast('Kategori butiran kustom ini sudah ditambahkan.', 'warning');
    return;
  }
  
  addCustomCompositionRow(key, 0);
  inputLabel.value = '';
};

function addCustomCompositionRow(key, value = 0) {
  const container = document.getElementById('custom-compositions-container');
  const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  
  const row = document.createElement('div');
  row.className = 'custom-comp-row form-group';
  row.setAttribute('data-key', key);
  row.style.display = 'flex';
  row.style.alignItems = 'center';
  row.style.gap = '12px';
  
  row.innerHTML = `
    <label class="form-label" style="flex: 2; margin-bottom: 0;">${label} (Pcs)</label>
    <input type="number" class="form-control" min="0" value="${value}" style="flex: 2;" required>
    <button type="button" class="btn btn-secondary btn-icon-only" onclick="this.parentElement.remove()" style="flex: 0.5; border-color: var(--accent); color: var(--accent); height: 42px;">
      <i data-lucide="trash-2"></i>
    </button>
  `;
  
  container.appendChild(row);
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

async function handlePackageSubmit(e) {
  e.preventDefault();

  const mode = document.getElementById('package-mode').value;
  const id = document.getElementById('package-id-input').value.trim().toUpperCase();
  const name = document.getElementById('package-name').value.trim();
  const price = parseFloat(document.getElementById('package-price').value) || 0;
  const packageTypeSelect = document.getElementById('package-type');
  const isSingle = packageTypeSelect && packageTypeSelect.value === 'single';

  if (!id || !name) {
    showToast('Kode dan nama menu wajib diisi.', 'warning');
    return;
  }

  let composition = {};
  if (!isSingle) {
    composition = {
      kulit: parseInt(document.getElementById('comp-kulit').value) || 0,
      telur: parseInt(document.getElementById('comp-telur').value) || 0,
      lenjer_kecil: parseInt(document.getElementById('comp-lenjer-kecil').value) || 0,
      lenjer_potong: parseInt(document.getElementById('comp-lenjer-potong').value) || 0,
      lenjer_besar: parseInt(document.getElementById('comp-lenjer-besar').value) || 0,
      kapal_selam: parseInt(document.getElementById('comp-kapal-selam').value) || 0
    };

    document.querySelectorAll('#custom-compositions-container .custom-comp-row').forEach(row => {
      const key = row.getAttribute('data-key');
      const valInput = row.querySelector('input[type="number"]');
      if (key && valInput) {
        composition[key] = parseInt(valInput.value) || 0;
      }
    });
  }

  try {
    if (mode === 'edit') {
      await window.db.updatePackage(id, { name, price, composition });
      showToast(`Menu "${name}" berhasil diperbarui.`, 'success');
    } else {
      if (state.packages[id]) {
        throw new Error(`Kode menu "${id}" sudah digunakan.`);
      }
      await window.db.addPackage(id, name, price, composition);
      showToast(`Menu "${name}" berhasil ditambahkan.`, 'success');
    }
    closeModal();
    await refreshData();
    navigate('packages');
  } catch (err) {
    showToast(err.message, 'danger');
  }
}

// --- DUMMY BATCH SUBMIT HANDLER ---
function handleBatchSubmit(e) {
  e.preventDefault();
}

function initCustomerSelectListener() {
  const saleCustomerSelect = document.getElementById('sale-customer-select');
  if (!saleCustomerSelect) return;
  saleCustomerSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    const groupName = document.getElementById('group-sale-customer-name');
    const groupPhone = document.getElementById('group-sale-customer-phone');
    const nameInput = document.getElementById('sale-customer-name');
    const phoneInput = document.getElementById('sale-customer-phone');
    const statusContainer = document.getElementById('sale-customer-status-container');
    const statusBadge = document.getElementById('sale-customer-status-badge');

    if (val === 'new') {
      groupName.style.display = 'block';
      groupPhone.style.display = 'block';
      nameInput.setAttribute('required', 'true');
      statusContainer.style.display = 'block';
      statusBadge.textContent = 'Pelanggan Baru';
      statusBadge.className = 'badge badge-primary';
    } else {
      groupName.style.display = 'none';
      groupPhone.style.display = 'none';
      nameInput.removeAttribute('required');
      
      const cust = state.customers.find(c => c.id === val);
      if (cust) {
        statusContainer.style.display = 'block';
        statusBadge.textContent = `Member Tier: ${cust.tier || 'BRONZE'} | Poin: ${cust.points || 0}`;
        statusBadge.className = `badge badge-${(cust.tier || 'BRONZE').toLowerCase()}`;
      } else {
        statusContainer.style.display = 'none';
      }
    }
  });
}

// --- INITIALIZE NEW MODALS ON WINDOW LOAD ---
window.openSaleModal = openSaleModal;
window.openExpenseModal = openExpenseModal;
window.openPackageModal = openPackageModal;

// Wait, let's call initCustomerSelectListener during initialization or inside this script.
setTimeout(() => {
  initCustomerSelectListener();
}, 1000);

// --- TOAST NOTIFICATIONS ---
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconName = 'info';
  if (type === 'success') iconName = 'check-circle';
  if (type === 'danger') iconName = 'x-circle';
  if (type === 'warning') iconName = 'alert-triangle';

  toast.innerHTML = `
    <i data-lucide="${iconName}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Animate slide-in
  setTimeout(() => {
    toast.classList.add('active');
  }, 10);

  // Auto remove after 3s
  setTimeout(() => {
    toast.classList.remove('active');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}
window.showToast = showToast;

// --- MANUAL STOCK ADJUSTMENT HANDLERS ---
function openAdjustLooseModal() {
  document.getElementById('form-adjust-loose').reset();
  openModal('modal-adjust-loose');
}

function openAdjustPackageModal() {
  const select = document.getElementById('adjust-package-select');
  select.innerHTML = '<option value="" disabled selected>Pilih Jenis Paket</option>';
  
  Object.keys(state.packages).forEach(pkgId => {
    const pkg = state.packages[pkgId];
    const option = document.createElement('option');
    option.value = pkgId;
    option.textContent = pkg.name;
    select.appendChild(option);
  });
  
  document.getElementById('form-adjust-package').reset();
  openModal('modal-adjust-package');
}

async function handleAdjustLooseSubmit(e) {
  e.preventDefault();
  const ingredientKey = document.getElementById('adjust-loose-item').value;
  const quantityChange = parseInt(document.getElementById('adjust-loose-qty').value) || 0;
  const notes = document.getElementById('adjust-loose-notes').value || 'Penyesuaian Manual';
  
  if (!ingredientKey) {
    showToast('Silakan pilih jenis pempek butiran.', 'warning');
    return;
  }
  
  if (quantityChange === 0) {
    showToast('Jumlah perubahan tidak boleh 0.', 'warning');
    return;
  }
  
  // Guard negative stock
  const currentStock = await window.db.getStockSummary();
  const available = currentStock.ingredients[ingredientKey] || 0;
  if (available + quantityChange < 0) {
    showToast(`Stok tidak boleh kurang dari 0 (Tersedia: ${available}).`, 'danger');
    return;
  }
  
  try {
    await window.db.adjustIngredientStock(ingredientKey, quantityChange, notes);
    showToast(`Berhasil menyesuaikan stok pempek butiran ${ingredientKey} sebesar ${quantityChange}.`, 'success');
    closeModal();
    navigate('stock');
  } catch (err) {
    showToast(`Gagal menyesuaikan stok: ${err.message}`, 'danger');
  }
}

async function handleAdjustPackageSubmit(e) {
  e.preventDefault();
  const packageId = document.getElementById('adjust-package-select').value;
  const quantityChange = parseInt(document.getElementById('adjust-package-qty').value) || 0;
  
  if (!packageId) {
    showToast('Silakan pilih jenis paket.', 'warning');
    return;
  }
  
  if (quantityChange === 0) {
    showToast('Jumlah perubahan tidak boleh 0.', 'warning');
    return;
  }
  
  // Guard negative stock
  const currentStockMap = await window.db.getPackageStock();
  const available = parseInt(currentStockMap[packageId]) || 0;
  if (available + quantityChange < 0) {
    showToast(`Stok tidak boleh kurang dari 0 (Tersedia: ${available}).`, 'danger');
    return;
  }
  
  try {
    await window.db.updatePackageStock(packageId, quantityChange);
    showToast(`Berhasil menyesuaikan stok paket sebesar ${quantityChange}.`, 'success');
    closeModal();
    navigate('stock');
  } catch (err) {
    showToast(`Gagal menyesuaikan stok: ${err.message}`, 'danger');
  }
}

async function adjustIngredientStockDirect(ingredientKey, quantityChange) {
  if (quantityChange === 0) return;
  
  // Guard negative stock
  const currentStock = await window.db.getStockSummary();
  const available = currentStock.ingredients[ingredientKey] || 0;
  if (available + quantityChange < 0) {
    showToast(`Stok tidak boleh kurang dari 0 (Tersedia: ${available}).`, 'danger');
    return;
  }
  
  const sign = quantityChange > 0 ? '+' : '';
  const notes = `Penyesuaian manual cepat (${sign}${quantityChange})`;
  
  try {
    await window.db.adjustIngredientStock(ingredientKey, quantityChange, notes);
    showToast(`Stok ${window.ITEM_LABELS[ingredientKey] || ingredientKey} disesuaikan (${sign}${quantityChange}).`, 'success');
    navigate('stock');
  } catch (err) {
    showToast(`Gagal: ${err.message}`, 'danger');
  }
}

async function adjustPackageStockDirect(packageId, quantityChange) {
  if (quantityChange === 0) return;
  
  // Guard negative stock
  const currentStockMap = await window.db.getPackageStock();
  const available = parseInt(currentStockMap[packageId]) || 0;
  if (available + quantityChange < 0) {
    showToast(`Stok tidak boleh kurang dari 0 (Tersedia: ${available}).`, 'danger');
    return;
  }
  
  const sign = quantityChange > 0 ? '+' : '';
  
  try {
    await window.db.updatePackageStock(packageId, quantityChange);
    showToast(`Stok paket disesuaikan (${sign}${quantityChange}).`, 'success');
    navigate('stock');
  } catch (err) {
    showToast(`Gagal: ${err.message}`, 'danger');
  }
}

// Expose functions globally for onclick & form bindings
window.openAdjustLooseModal = openAdjustLooseModal;
window.openAdjustPackageModal = openAdjustPackageModal;
window.adjustIngredientStockDirect = adjustIngredientStockDirect;
window.adjustPackageStockDirect = adjustPackageStockDirect;
window.viewReceipt = (saleId) => {
  navigate('receipt', { saleId });
};

/* --- ANTIGRAVITY INSERTION END --- */
