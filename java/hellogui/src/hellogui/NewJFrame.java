/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hellogui;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

/**
 *
 * @author owner
 */
public class NewJFrame extends javax.swing.JFrame {

    /**
     * Creates new form NewJFrame
     */
    public NewJFrame() {
        initComponents();
    }
    
    private int encSelected = 0;
    
    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jPanel1 = new javax.swing.JPanel();
        jLabel1 = new javax.swing.JLabel();
        jButton1 = new javax.swing.JButton();
        jLabel2 = new javax.swing.JLabel();
        jScrollPane1 = new javax.swing.JScrollPane();
        b = new javax.swing.JTextArea();
        jScrollPane2 = new javax.swing.JScrollPane();
        a = new javax.swing.JTextArea();
        enc = new javax.swing.JToggleButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setTitle("Lora");
        setBounds(new java.awt.Rectangle(0, 0, 0, 0));
        setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));

        jPanel1.setBackground(new java.awt.Color(0, 0, 50));
        jPanel1.setBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(0, 0, 0)));
        jPanel1.setForeground(new java.awt.Color(255, 255, 255));
        jPanel1.setToolTipText("");
        jPanel1.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        jLabel1.setBackground(new java.awt.Color(222, 222, 222));
        jLabel1.setForeground(new java.awt.Color(255, 255, 255));
        jLabel1.setText("Input");
        jPanel1.add(jLabel1, new org.netbeans.lib.awtextra.AbsoluteConstraints(25, 13, -1, -1));

        jButton1.setForeground(new java.awt.Color(255, 255, 255));
        jButton1.setText("Convert");
        jButton1.setBorder(null);
        jButton1.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mousePressed(java.awt.event.MouseEvent evt) {
                jButton1MousePressed(evt);
            }
        });
        jPanel1.add(jButton1, new org.netbeans.lib.awtextra.AbsoluteConstraints(286, 35, 85, 91));

        jLabel2.setBackground(new java.awt.Color(222, 222, 222));
        jLabel2.setForeground(new java.awt.Color(255, 255, 255));
        jLabel2.setText("Output");
        jPanel1.add(jLabel2, new org.netbeans.lib.awtextra.AbsoluteConstraints(20, 130, -1, -1));

        b.setEditable(false);
        b.setColumns(20);
        b.setRows(5);
        jScrollPane1.setViewportView(b);

        jPanel1.add(jScrollPane1, new org.netbeans.lib.awtextra.AbsoluteConstraints(20, 150, 420, -1));

        jScrollPane2.setHorizontalScrollBarPolicy(javax.swing.ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
        jScrollPane2.setVerticalScrollBarPolicy(javax.swing.ScrollPaneConstants.VERTICAL_SCROLLBAR_NEVER);
        jScrollPane2.setViewportBorder(new javax.swing.border.MatteBorder(null));

        a.setColumns(5);
        a.setForeground(new java.awt.Color(18, 30, 49));
        a.setLineWrap(true);
        a.setRows(4);
        a.setCaretColor(new java.awt.Color(18, 30, 49));
        a.setSelectedTextColor(new java.awt.Color(30, 18, 49));
        jScrollPane2.setViewportView(a);

        jPanel1.add(jScrollPane2, new org.netbeans.lib.awtextra.AbsoluteConstraints(19, 35, 255, 90));

        enc.setForeground(new java.awt.Color(255, 255, 255));
        enc.setText("Enc");
        enc.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                encActionPerformed(evt);
            }
        });
        jPanel1.add(enc, new org.netbeans.lib.awtextra.AbsoluteConstraints(376, 35, 68, 91));

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, 459, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 0, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, 261, Short.MAX_VALUE)
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void jButton1MousePressed(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_jButton1MousePressed
        String tempStr = a.getText();
        List<String> tempList2 = new ArrayList<>();
        int j = 0;
        String recognitionString = "hd35ojpdwj1p";
        
        if (encSelected == 0) {
            // encryped code will have form of int + encrypted code;
            List<String> tempList = new ArrayList<>(Arrays.asList(tempStr.split(recognitionString)));
            System.out.println(tempList);
            
            // Abstract only front numbers from input
            while (Integer.valueOf(tempList.get(0)) > 0) {
                // Decrypting Code
                
                // Controlling initial number
                int tempNum = Integer.parseInt(tempList.get(0));
                                
                if (tempNum == 1) {
                    tempList.remove(0);
                    break;
                } else {
                    tempList.set(0, String.valueOf(tempNum - 1));
                }
            }
            
            System.out.println(tempList);
            
        } else {
            
        }

        System.out.println(tempList2);

        b.setText(String.join("",tempList2));
    }//GEN-LAST:event_jButton1MousePressed

    private void encActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_encActionPerformed
        // TODO add your handling code here:
        if (encSelected == 0) {
            encSelected++;
        } else {
            encSelected--;
        }        
    }//GEN-LAST:event_encActionPerformed

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(NewJFrame.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(NewJFrame.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(NewJFrame.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(NewJFrame.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new NewJFrame().setVisible(true);
            }
        });
        
        System.out.println(ThreadLocalRandom.current().nextInt(1, 10 + 1));
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JTextArea a;
    private javax.swing.JTextArea b;
    private javax.swing.JToggleButton enc;
    private javax.swing.JButton jButton1;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JScrollPane jScrollPane2;
    // End of variables declaration//GEN-END:variables
}
