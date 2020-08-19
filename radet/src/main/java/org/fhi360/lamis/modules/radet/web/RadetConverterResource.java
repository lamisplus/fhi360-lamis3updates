package org.fhi360.lamis.modules.radet.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.fhi360.lamis.modules.radet.service.RadetConverterService;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RadetConverterResource {
    private final RadetConverterService radetConverterService;
    private final SimpMessageSendingOperations messagingTemplate;

    @GetMapping("/radet/convert")
    @Async
    public void run(@RequestParam LocalDate cohortStart, @RequestParam LocalDate cohortEnd,
                    @RequestParam LocalDate reportingPeriod, @RequestParam List<Long> ids,
                    @RequestParam(defaultValue = "false") Boolean today) {
        messagingTemplate.convertAndSend("/topic/radet/status", "start");
        ids.forEach(id -> radetConverterService.convertExcel(id, cohortStart, cohortEnd, reportingPeriod, today));
        messagingTemplate.convertAndSend("/topic/radet/status", "end");
    }

    @GetMapping("/radet/list-facilities")
    public List<Map<String, Object>> listFacilities() {
        return radetConverterService.listFacilities();
    }

    @GetMapping("/radet/download/{file}")
    public void downloadFile(@PathVariable String file, HttpServletResponse response) throws IOException {
        ByteArrayOutputStream baos = radetConverterService.downloadFile(file);
        response.setHeader("Content-Type", "application/octet-stream");
        response.setHeader("Content-Length", Integer.valueOf(baos.size()).toString());
        OutputStream outputStream = response.getOutputStream();
        outputStream.write(baos.toByteArray());
        outputStream.close();
        response.flushBuffer();
    }

    @GetMapping("/radet/list-files")
    public Collection<String> listFiles() {
        return radetConverterService.listFiles();
    }
}
