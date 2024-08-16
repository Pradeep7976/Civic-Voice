package org.koder.miniprojectbackend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.koder.miniprojectbackend.entity.ReportProblem;
import org.koder.miniprojectbackend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class mailService {
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private UserService userService;
    @Autowired
    private ReportProblemService problemService;

    public static String  MailReceivedSub="Issue Received";


    public void sendHtmlEmail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);
        helper.setFrom("your-email@example.com");

        mailSender.send(mimeMessage);
    }

    public boolean sendEmailOnProblemReported(Long pid, Long uid){
        try {
            ReportProblem reportedProblem = problemService.getReportProblemById(pid);
            User user = userService.getDetailsByUid(uid);
            String mailId = null;
            if (user != null && user.getEmail() != null) {
                mailId = user.getEmail();
            }

            // Set default image URL
            String imgUrl = "https://ik.imagekit.io/aj4rz7nxsa/Mini_project/av5c8336583e291842624_Yp22FJ3dQ.png?updatedAt=1681579723021";
            if (reportedProblem != null && reportedProblem.getImageUrl() != null) {
                imgUrl = reportedProblem.getImageUrl();
            }
            assert reportedProblem != null;
            String emailContent = String.format(
                    "<h4>Your complaint is successfully registered. We will try our best to solve the problem as soon as possible.</h4>" +
                            "<p>Department: %s</p>" +
                            "<p>Issue Submitted on: %s</p>" +
                            "<img src=\"%s\" width=\"355rem\"></img>" +
                            "<h4>Thanks for reporting.</h4>",
                    reportedProblem.getDepartment(),
                    reportedProblem.getDate().toString(),
                    imgUrl
            );
            sendHtmlEmail(mailId,MailReceivedSub,emailContent);
            return true;
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
