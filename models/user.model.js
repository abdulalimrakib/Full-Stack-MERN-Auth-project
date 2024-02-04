const mongoose = require("mongoose")

const modelSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    image:{
        type:String,
        default:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAPFBMVEWVu9////+Rud6Mtt35+/2dwOHz9/vE2Oy/1eva5vPg6vWhwuLn7/fU4vGlxePs8vmxzOe40enN3u+EsdseWUnbAAAExElEQVR4nO1c27KrKhDEGcCACoj//69bY5KVuzDoaJ2TfloPsVbXwNxbhfjhh/8UYMTeHN4DEIVSTeNc0yghEA/Fc2QX6s62Xmsptfat7epwGI4gVN/K6gWy7ZXYnyNgMK/krjBhbzOi8m+Md2dGr3BXel+sd7PifhTR+WV+VeXdTgzxlEJvwmkXhlCn8quqegdXSbffmSG7DbHP4VdVPTNDaL5Gl1fIhvmU2zx+VdWy0su7gDNYXRnz+VUVI0GMFIKRjSGopAzyDK24/AQIN3DCiYsgZrvwjJbtjGn8qoqJHvWE2c54IJ7weMYDC0GhqQQ1Dz+XmYb/IB0HP8isY+7Rc1xCzChUn8FSFtLy3AyWbAcdnWDHccSQ0Gp+gmHgJ4SlE7Q/gj+C/wuCBV7ME2ZKAjVLqjt6JqH0xFew9MYQ6OVWYLmDJfUgT81/9Ip6oBPk6UmQXG91PI3x4dtOaKgEuYaYpOHbBK7RB1BnM2zTLWJfx7aMgEAjyJJHzqANML3i4ieQVBIaviE1bfrBMve4YKAQZF1DEM6Y8YRpyYR5F5bd2vGuwgh1P9sO4sowMxR67oXx0ffFuSZkN2BuQuYM0ldghiPbPWQfgMntp9xHH5Wekfc44DPDxCkNy8joPcOklGz2E8BBSsaze4oIYXlp0u0rcoSlMUO3m8Lx+n8xfBnV6IBPP+cCitssEpuPrmKa249OgjFWA4hO3m0uQdl3Ilv7J0PBupKd4JFYA4qLrPZu4IyqfuQobX2nDL1cVBPE1jcSAKG+yWrvp2komlCb1kvpW1OH5p7KzZGkr2FDiqPt3OmhyPINPv4Ah2HAJ4U3No/PnNw21xEGcXq5arpfnJli/+zl0p7EsLYdQbj3vtp+vfoA6v0kzLh1Aw9+oHe+ie7TtQJ0n8O4WVO8PMRvpZ+0I8UXO47+5N5Fn7/H4lojdVheH+oYnJq844zxD+VCXFwGmJWOOa22163p6j6M6OvOtEmrinU6AfrWYRlr7CVKhEbLWKEZUOS9Ugp08dR1ywOeUHzI5J1IKgoJlqzX01C6hCfN83Pgi+ht68Izihy5REiWirK2mbz9T4csMSBx55WHgg3Z1kFwRkEoxE2zyBWaTlAxXMHxEpLTHUeQmUAONNunkRnkZMIRBSeQI+GHjmx1tNRLmPvuHBWyIRJ0PPyqivgOAl1hlAviopEnj0wg5pLchSYdxE0eSZhAA23GAHwESXeQp9aaQaq4StS+uSCpg/mcmOjGOfvgUpCmSFSVIAUkZSFN4kYDSRjnWOr9GZqQjQsU8fmgaOg5wyCp6udqSOgEC96QzAdBf3t4goKppZsR8/kJxkw3KRuywdVzziB0nsCYisdkTCDImIpJyfjwFjy8Fx8+k7DNtiaQ9HFQ8hJnLj/aaAFE1JvXXFJH+l57EvF02247u1Kxz/hwMBuZUZqwjlwKhxDtyobUNoZhPd3HJDoKcbUuysfgVpdxTWoOcNF//yDiEqT30cEkD1mX3Y0ljqbso6G9dGVi7xi+L3rW8KhQm3RbSm/qoC6PcgFxwCbUnbH+U7CU2lvT1aEZf7rPRxwnkREI5dyk5onG2taPaK01cdL4OKfEhvctg+f8iV28w/zJ3d2Z/fDDCvgH8aM/ihVy3pcAAAAASUVORK5CYII='
    }
}, {timestamps:true})

const User = mongoose.model("User", modelSchema)

module.exports = User

