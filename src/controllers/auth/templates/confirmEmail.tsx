import {
    Html,
    Body,
    Button,
    Head,
    Section,
    Row,
    Column,
    Img,
    Link,
    Text,
    Hr,
    Heading,
    Font,
    Container,
} from "@react-email/components";
import { render } from "@react-email/render";

type ConfirmEmailProps = {
    url: string;
    username?: string;
    token: string;
};

export const ConfirmEmail = ({ url, username, token }: ConfirmEmailProps) => {
    const colorsScheme = {
        primary: "#4F46E5",
        text: "#000",
        lightText: "#828282",
        background: "#F9FAFB",
        white: "#fff",
    };

    return (
        <Html>
            <Head>
                <Font
                    fontFamily="Gilroy"
                    fallbackFontFamily={["Helvetica", "Arial", "Verdana"]}
                    webFont={{
                        url: "https://fonts.cdnfonts.com/css/gilroy-bold",
                        format: "woff",
                    }}
                ></Font>
            </Head>
            <Body
                style={{
                    fontFamily: "Gilroy, Helvetica, Arial, Verdana",
                    backgroundColor: colorsScheme.background,
                }}
            >
                <Container
                    style={{
                        maxWidth: "600px",
                        backgroundColor: colorsScheme.white,
                        borderRadius: "20px",
                    }}
                >
                    <Section
                        style={{
                            padding: "20px",
                        }}
                    >
                        <Row>
                            <Column width={"65%"}>
                                <Img
                                    alt="React Email logo"
                                    height="42"
                                    src="https://react.email/static/logo-without-background.png"
                                />
                            </Column>
                            <Column
                                align="right"
                                width={"35%"}
                                style={{ textAlign: "right" }}
                            >
                                <Row align="right">
                                    <Column>
                                        <Link
                                            href="#"
                                            style={{
                                                color: colorsScheme.lightText,
                                                textDecoration: "none",
                                                fontFamily:
                                                    "Gilroy-Medium, Helvetica",
                                            }}
                                        >
                                            Sign In
                                        </Link>
                                    </Column>
                                    <Column
                                        style={{
                                            paddingLeft: 8,
                                            paddingRight: 8,
                                        }}
                                    >
                                        <Link
                                            href="#"
                                            style={{
                                                color: colorsScheme.primary,
                                                textDecoration: "none",
                                                fontFamily:
                                                    "Gilroy-Medium, Helvetica",
                                            }}
                                        >
                                            Sign Up
                                        </Link>
                                    </Column>
                                </Row>
                            </Column>
                        </Row>
                    </Section>
                    <Hr />
                    <Section
                        style={{
                            fontFamily: "Gilroy-Medium, Helvetica",
                            padding: "20px",
                        }}
                    >
                        <Heading
                            as="h2"
                            style={{
                                fontFamily: "Gilroy-Bold, Helvetica",
                                color: "#000",
                                fontWeight: "600",
                                letterSpacing: "1px",
                            }}
                        >
                            Email Confirmation
                        </Heading>
                        <Text
                            style={{
                                fontFamily: "Gilroy-Medium, Helvetica, Arial",
                                fontSize: "16px",
                            }}
                        >
                            Hello, <strong>{username}</strong>!
                        </Text>
                        <Text
                            style={{
                                fontFamily: "Gilroy-Medium, Helvetica, Arial",
                                fontSize: "16px",
                            }}
                        >
                            Thank you for registering with Aulina's Vocabulary.
                            To activate your account and start expanding your
                            vocabulary, please confirm your email by clicking
                            the button below:
                        </Text>
                        <Button
                            href={`http://localhost:3000/auth/activate?token=${token}`}
                            style={{
                                backgroundColor: colorsScheme.primary,
                                color: colorsScheme.white,
                                padding: "10px 20px",
                                borderRadius: "10px",
                                boxSizing: "border-box",
                                width: "100%",
                                textAlign: "center",
                                fontWeight: "700",
                            }}
                        >
                            Verify Email
                        </Button>
                        <Text
                            style={{
                                margin: "40px 0",
                                color: colorsScheme.lightText,
                            }}
                        >
                            If you didn't create an account, please ignore this
                            email.
                            <br />
                            The verification button will be active for 24 hours.
                        </Text>
                    </Section>
                    <Section
                        style={{ backgroundColor: "#f3f4f6", padding: "20px" }}
                    >
                        <Text style={{ color: colorsScheme.lightText }}>
                            Best regards,
                            <br />
                            Aulina's Vocabulary Team
                        </Text>
                        <span
                            style={{
                                fontSize: "12px",
                                color: colorsScheme.lightText,
                            }}
                        >
                            © {new Date().getFullYear()} Aulina's Vocabulary.
                            All rights reserved.
                        </span>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default ConfirmEmail;
